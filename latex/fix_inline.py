"""Post-process the Pandoc LaTeX output for the Bonus 1 PDF.

Pandoc writes inline code as \\passthrough{\\lstinline!...!}.  That form cannot
break at spaces, so long snippets run into the margin.  This script turns each
one into \\texttt{...} with the special characters escaped, enables line
breaking in listings, and makes the page a little wider.
"""

from pathlib import Path
import re

path = Path(__file__).with_name("field-guide.tex")
text = path.read_text(encoding="utf-8")

REPLACEMENTS = {
    "\\": r"\textbackslash{}",
    "{": r"\{",
    "}": r"\}",
    "$": r"\$",
    "&": r"\&",
    "#": r"\#",
    "%": r"\%",
    "_": r"\_",
    "^": r"\textasciicircum{}",
    "~": r"\textasciitilde{}",
    "<": r"\textless{}",
    ">": r"\textgreater{}",
    "|": r"\textbar{}",
}


def escape_code(value: str) -> str:
    return "".join(REPLACEMENTS.get(char, char) for char in value)


inline_pattern = re.compile(r"\\passthrough\{\\lstinline(.)(.*?)\1\}", re.S)


def replace_inline(match: re.Match[str]) -> str:
    return r"\texttt{" + escape_code(match.group(2)) + "}"


text, inline_count = inline_pattern.subn(replace_inline, text)

# Pandoc's listings output can contain escaped braces inside inline code.
# After our conversion they would print as a literal backslash plus a brace.
text = text.replace(r"\textbackslash{}\{", r"\{")
text = text.replace(r"\textbackslash{}\}", r"\}")
# A pipe escaped for a Markdown table can end up with two backslashes.
text = text.replace(r"\textbackslash{}\textbackslash{}\textbar{}", r"\textbar{}")

text = text.replace(
    r"\usepackage[margin=2.5cm]{geometry}",
    r"\usepackage[margin=2cm]{geometry}",
)
text = text.replace(
    r"\setlength{\emergencystretch}{3em}",
    r"\setlength{\emergencystretch}{8em}",
)
text = text.replace(
    r"\lstset{defaultdialect=[x86masm]Assembler}",
    "\n".join(
        [
            r"\lstset{defaultdialect=[x86masm]Assembler}",
            r"\lstset{",
            r"  breaklines=true,",
            r"  breakatwhitespace=false,",
            r"  columns=fullflexible,",
            r"  basicstyle=\ttfamily\small,",
            r"  keepspaces=true,",
            r"  showstringspaces=false,",
            r"  frame=single,",
            r"  postbreak=\mbox{\textcolor{gray}{$\hookrightarrow$}\space}",
            r"}",
        ]
    ),
)
text = text.replace(
    r"\begin{document}",
    "\\begin{document}\n\\sloppy",
    1,
)
text = text.replace(
    r"\begin{longtable}[]{@{}ll@{}}",
    r"\begin{longtable}[]{@{}>{\raggedright\arraybackslash}p{0.28\linewidth}>{\raggedright\arraybackslash}p{0.66\linewidth}@{}}",
    1,
)

path.write_text(text, encoding="utf-8")
print(f"Converted {inline_count} inline code snippets")
