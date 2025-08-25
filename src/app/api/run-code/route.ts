// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { code, language } = await req.json();

//     const languageMap: Record<string, number> = {
//       cpp: 54,
//       python: 71,
//       javascript: 63,
//     };

//     const languageId = languageMap[language.toLowerCase()] || 54;

//     const response = await fetch(
//       "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           source_code: code,
//           language_id: languageId,
//         }),
//       }
//     );

//     const data = await response.json();

//     const output =
//       data.stdout || data.stderr || data.compile_output || "No output";

//     return NextResponse.json({ output });
//   } catch (err) {
//     console.error("Judge0 error:", err);
//     return NextResponse.json({ error: "Execution failed" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, language, input } = await req.json();

    const languageMap: Record<string, number> = {
      cpp: 54,
      python: 71,
      javascript: 63,
    };

    const languageId = languageMap[language.toLowerCase()] || 54;

    const response = await fetch(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: input || "",   // ✅ add custom input
        }),
      }
    );

    const data = await response.json();

    const output =
      data.stdout || data.stderr || data.compile_output || "No output";

    return NextResponse.json({ output });
  } catch (err) {
    console.error("Judge0 error:", err);
    return NextResponse.json({ error: "Execution failed" }, { status: 500 });
  }
}
