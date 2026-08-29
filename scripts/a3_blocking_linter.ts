/**
 * A3 BLOCKING LINTER — CIVIC / OPEN TRUST (OTM)
 * Enforcement of ANVIL Gate G1, Design Law 1 (One-Way Wall), and Zero-PII Isolation.
 * 
 * Usage: npx tsx scripts/a3_blocking_linter.ts [directory_path]
 */

import * as fs from "fs";
import * as path from "path";

interface LintViolation {
  file: string;
  line: number;
  rule: string;
  severity: "BLOCKING" | "WARNING";
  snippet: string;
  description: string;
}

const PII_PATTERNS = [
  { rule: "PII-SSN", regex: /\b\d{3}-\d{2}-\d{4}\b/g, desc: "Potential Social Security Number pattern detected." },
  { rule: "PII-EMAIL", regex: /[a-zA-Z0-9._%+-]+@(?!unykorn\.ai|via\.miami|partner\.org|example\.com|civic\.internal)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, desc: "Personal email address detected in source code." },
  { rule: "PII-PHONE", regex: /\b(?:\+1[-.\s])\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g, desc: "US Telephone number pattern detected." },
  { rule: "PII-CLEARTEXT-FIELD", regex: /\b(first_name|last_name|ssn|date_of_birth|home_address)\s*:/gi, desc: "Direct PII field name identifier detected in on-chain or verifier struct." }
];

const FLOAT_MATH_PATTERNS = [
  { rule: "GATE-G1-FLOAT-MATH", regex: /\b(parseFloat|Number\.prototype\.toFixed|Math\.round\([^)]*\/(?!\bBigInt\b))\b/g, desc: "Floating point math used in financial logic. Must use integer minor units (BigInt)." }
];

const ONE_WAY_WALL_PATTERNS = [
  { rule: "DESIGN-LAW-1-DIRECT-WRITE", regex: /\b(db\.query\s*\(\s*["']INSERT|db\.query\s*\(\s*["']UPDATE|knex\s*\(\s*["']county_origin_)\b/gi, desc: "Public edge attempting write operation to municipal origin database (One-Way Wall violation)." }
];

export class A3BlockingLinter {
  public violations: LintViolation[] = [];

  public scanDirectory(dir: string, extensions: string[] = [".ts", ".tsx", ".sol", ".rs", ".json"]): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const ignoredDirs = ["node_modules", ".git", "dist", "scripts", "test", ".system_generated"];
        if (!ignoredDirs.includes(entry.name)) {
          this.scanDirectory(fullPath, extensions);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          this.scanFile(fullPath);
        }
      }
    }
  }

  public scanFile(filePath: string): void {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    lines.forEach((lineText, lineIdx) => {
      const lineNum = lineIdx + 1;

      // Check PII Patterns
      PII_PATTERNS.forEach(({ rule, regex, desc }) => {
        if (regex.test(lineText)) {
          this.violations.push({
            file: filePath,
            line: lineNum,
            rule,
            severity: "BLOCKING",
            snippet: lineText.trim(),
            description: desc
          });
        }
        regex.lastIndex = 0;
      });

      // Check Float Math in Smart Contracts / Core Financial Schemas
      if (filePath.includes("contracts") || filePath.includes("schemas") || filePath.includes("por")) {
        FLOAT_MATH_PATTERNS.forEach(({ rule, regex, desc }) => {
          if (regex.test(lineText)) {
            this.violations.push({
              file: filePath,
              line: lineNum,
              rule,
              severity: "BLOCKING",
              snippet: lineText.trim(),
              description: desc
            });
          }
          regex.lastIndex = 0;
        });
      }

      // Check One-Way Wall
      ONE_WAY_WALL_PATTERNS.forEach(({ rule, regex, desc }) => {
        if (regex.test(lineText)) {
          this.violations.push({
            file: filePath,
            line: lineNum,
            rule,
            severity: "BLOCKING",
            snippet: lineText.trim(),
            description: desc
          });
        }
        regex.lastIndex = 0;
      });
    });
  }

  public report(): boolean {
    console.log("===============================================================");
    console.log("      A3 BLOCKING LINTER — CIVIC / OPEN TRUST AUDIT REPORT      ");
    console.log("===============================================================\n");

    const blockingErrors = this.violations.filter(v => v.severity === "BLOCKING");

    if (blockingErrors.length === 0) {
      console.log("✅ 0 BLOCKING VIOLATIONS DETECTED.");
      console.log("   • Zero-PII Invariant: VALIDATED");
      console.log("   • Gate G1 Integer Money Math: VALIDATED");
      console.log("   • Design Law 1 (One-Way Wall): VALIDATED\n");
      return true;
    }

    console.error(`❌ LINT FAILED: ${blockingErrors.length} BLOCKING violations found.\n`);

    this.violations.forEach((v, idx) => {
      console.error(`[${idx + 1}] [${v.severity}] ${v.rule} at ${v.file}:${v.line}`);
      console.error(`    Description: ${v.description}`);
      console.error(`    Snippet:     ${v.snippet}\n`);
    });

    return blockingErrors.length === 0;
  }
}

// CLI Execution Entry Point
const targetDir = process.argv[2] || process.cwd();
const linter = new A3BlockingLinter();
linter.scanDirectory(targetDir);
const success = linter.report();
if (!success) {
  process.exit(1);
}
