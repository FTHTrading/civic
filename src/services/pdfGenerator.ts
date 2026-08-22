import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface MetricRow {
  label: string;
  metric: string;
  baseline: string;
  target: string;
}

export interface DocumentArtifact {
  id: string;
  documentNumber: string;
  title: string;
  category: 'Transit & Mobility' | 'Aviation & Freight' | 'Resilience & Water' | 'Digital Trust & Identity' | 'Energy & Grid';
  classification: 'MUNICIPAL SANDBOX' | 'TECHNICAL SPECIFICATION' | 'INTEROPERABILITY RUNBOOK';
  status: 'Ready' | 'Under Review' | 'Verified Sandbox';
  version: string;
  lastUpdated: string;
  custodian: string;
  pageCount: number;
  executiveSummary: string;
  stakeholderValue: string;
  technicalArchitecture: string[];
  metrics: MetricRow[];
  complianceFramework: string;
  hashSignature: string;
  pdfUrl?: string;
}

export const MUNICIPAL_DOCUMENTS: DocumentArtifact[] = [
  {
    id: 'mia-dtpw-smart-transit-01',
    documentNumber: 'MIA-DTPW-2026-V3',
    title: 'Miami-Dade DTPW Rapid Transit Automated Clearing & Dispatch Architecture',
    category: 'Transit & Mobility',
    classification: 'TECHNICAL SPECIFICATION',
    status: 'Verified Sandbox',
    version: '3.4.1',
    lastUpdated: 'August 14, 2026',
    custodian: 'Dept. of Transportation and Public Works (DTPW) / Urban Mobility Cluster',
    pageCount: 14,
    executiveSummary: 'Defines the sub-second cryptographic settlement protocol and multi-modal dispatch gateway for the Metrorail, Metromover, and SMART Program rapid transit corridors. Eliminates reconciliation lag across regional transit operators.',
    stakeholderValue: 'Reduces fare revenue clearing latency from 72 hours to under 450 milliseconds. Yields an estimated $14.2M in annual operational savings across regional fare collection, ticketing hardware overhead, and fraud mitigation.',
    technicalArchitecture: [
      'Layer 1 permissioned distributed ledger utilizing dual-quorum validator clusters across County datacenters.',
      'Sub-50ms contactless NFC validator edge-node runtime embedded in Metrorail faregates.',
      'Automated GTFS-RT (General Transit Feed Specification Real-Time) vehicle location synchronization.',
      'Zero-knowledge proof (ZKP) verification for student, senior, and low-income fare concessions without exposing PII.'
    ],
    metrics: [
      { label: 'Settlement Latency', metric: 'Fare Clearance', baseline: '72 hours (Batch)', target: '380 ms' },
      { label: 'Network Throughput', metric: 'Peak Ingress', baseline: '2,400 tx/sec', target: '18,500 tx/sec' },
      { label: 'Operational Cost', metric: 'Per Transaction', baseline: '$0.18 per swipe', target: '$0.004 per swipe' },
      { label: 'Uptime SLA', metric: 'High-Availability', baseline: '99.2%', target: '99.999%' }
    ],
    complianceFramework: 'FDOT Rule 14-90, ISO/IEC 27001, CJIS Section 5, PCI-DSS Level 1',
    hashSignature: '0x8f9c1b4e237a89d3c5f2104e76a92d4b68e1c3a7f5024e6b1897c5a3d2e1f40b',
    pdfUrl: '/documents/mia-via-infrastructure-overview-v1.0.pdf'
  },
  {
    id: 'mdad-freight-corridor-02',
    documentNumber: 'MDAD-CARGO-2026-X8',
    title: 'MDAD International Cargo Substation & Automated Air-to-Sea Customs Pipeline',
    category: 'Aviation & Freight',
    classification: 'INTEROPERABILITY RUNBOOK',
    status: 'Ready',
    version: '2.1.0',
    lastUpdated: 'July 28, 2026',
    custodian: 'Miami-Dade Aviation Department (MDAD) / PortMiami Logistics Link',
    pageCount: 18,
    executiveSummary: 'Standard operating framework connecting Miami International Airport (MIA) Air Cargo Hub with the PortMiami Intermodal Logistics Terminal. Coordinates tamper-proof electronic bills of lading (eBL) and bonded freight handoffs.',
    stakeholderValue: 'Cuts container dwell time along the NW 25th Street dedicated freight corridor by 38%, unlocking 2.8 million metric tons of high-velocity perishable and pharmaceutical cold-chain cargo throughput annually.',
    technicalArchitecture: [
      'GS1 and UN/CEFACT-compliant data schemas mapped to municipal ledger state channels.',
      'IoT cellular-GPS temperature and tilt sensor streams anchored via cryptographic state checkpoints.',
      'Automated bond verification dispatch interface with U.S. Customs and Border Protection (CBP) ACE system.',
      'Smart contract-controlled digital seal verification gates across NW 25th Viaduct checkpoints.'
    ],
    metrics: [
      { label: 'Corridor Transit Time', metric: 'MIA to PortMiami', baseline: '165 minutes', target: '52 minutes' },
      { label: 'Document Clearance', metric: 'Customs Verification', baseline: '4.5 hours', target: '11 minutes' },
      { label: 'Cold-Chain Spoilage', metric: 'Pharmaceuticals', baseline: '1.42%', target: '< 0.04%' },
      { label: 'Perishable Throughput', metric: 'Annual Metric Tons', baseline: '2.1M MT', target: '2.85M MT' }
    ],
    complianceFramework: 'C-TPAT Tier 3, FDA 21 CFR Part 11, IATA Cargo-XML, TSA Secure Cargo Standard',
    hashSignature: '0x3d7a9b0e12f45c8a6e3d9876543210abcedf0123456789abcdef0123456789ab',
    pdfUrl: '/documents/mia-via-technical-architecture-v1.0.pdf'
  },
  {
    id: 'wasd-water-grid-resilience-03',
    documentNumber: 'WASD-RESIL-2026-09',
    title: 'Biscayne Aquifer SCADA Integrity & Storm Surge Desalination Telemetry Protocol',
    category: 'Resilience & Water',
    classification: 'TECHNICAL SPECIFICATION',
    status: 'Verified Sandbox',
    version: '4.0.2',
    lastUpdated: 'August 02, 2026',
    custodian: 'Water and Sewer Department (WASD) / Office of Resilience',
    pageCount: 22,
    executiveSummary: 'Cryptographically sealed SCADA network architecture monitoring wellfield salinity, pump station power telemetry, and wastewater outflow monitoring across Central and South District wastewater treatment facilities.',
    stakeholderValue: 'Guarantees unalterable environmental water quality telemetry, preempts saltwater intrusion risks in the Biscayne Aquifer, and enforces automated mitigation pump cut-ins during king tide and hurricane events.',
    technicalArchitecture: [
      'Hardware security modules (HSM) retrofitted directly onto MODBUS and DNP3 industrial RTUs.',
      'Zero-trust edge broker routing sensor readings over dedicated municipal dark fiber ring.',
      'Automated EPA Clean Water Act compliance assertion generation and public audit log streams.',
      'Distributed multi-party computation (MPC) keys for remote emergency valve override authorization.'
    ],
    metrics: [
      { label: 'Anomaly Detection', metric: 'Saltwater Infiltration', baseline: '24–48 hours', target: '< 45 seconds' },
      { label: 'SCADA Hash Rate', metric: 'Telemetry Attestation', baseline: 'Manual Daily', target: '1,000 logs/sec' },
      { label: 'Emergency Valve Cut-in', metric: 'Surge Activation', baseline: '18 minutes', target: '1.2 seconds' },
      { label: 'Power Consumption', metric: 'Telemetry Network', baseline: '45 kW/station', target: '2.1 kW/station' }
    ],
    complianceFramework: 'NIST SP 800-82 Rev 3, AWIA Section 2013, EPA CWA Title IV, FDEP Rule 62-555',
    hashSignature: '0x5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    pdfUrl: '/documents/mia-via-pilot-implementation-framework-v1.0.pdf'
  },
  {
    id: 'mdc-identity-governance-04',
    documentNumber: 'MDC-IDENTITY-2026-01',
    title: 'Miami-Dade Decentralized Resident Identifier (DRI) & Civic Services Trust Registry',
    category: 'Digital Trust & Identity',
    classification: 'MUNICIPAL SANDBOX',
    status: 'Verified Sandbox',
    version: '1.9.4',
    lastUpdated: 'August 18, 2026',
    custodian: 'Information Technology Department (ITD) / County Clerk of the Board',
    pageCount: 16,
    executiveSummary: 'Self-sovereign digital identity backbone enabling privacy-preserving access to county services, property records, business licensing, and transit benefits without central credential database honeypots.',
    stakeholderValue: 'Removes $6.8M in credential storage risk, achieves 100% compliance with Florida Sunshine Public Records laws while maintaining strict resident data privacy via zero-knowledge verifiable credentials.',
    technicalArchitecture: [
      'W3C-compliant Decentralized Identifiers (DIDs) mapped to a municipal permissioned ledger.',
      'Selective disclosure protocols allowing residents to prove residency, income eligibility, or age without revealing name or address.',
      'Cryptographic revocable credentials for commercial contractor licensing and county building permits.',
      'Multi-factor physical kiosk and mobile application authentication via passkeys and biometric secure enclaves.'
    ],
    metrics: [
      { label: 'Verification Latency', metric: 'Service Access', baseline: '3–5 days (Manual)', target: '850 ms' },
      { label: 'Data Breach Risk', metric: 'Honeypot Elimination', baseline: 'High (Central SQL)', target: 'Zero (Non-custodial)' },
      { label: 'Permit Issuance', metric: 'Automated Clearance', baseline: '14 days', target: '< 4 hours' },
      { label: 'Verification Cost', metric: 'Per Query', baseline: '$12.50 per check', target: '$0.008 per check' }
    ],
    complianceFramework: 'NIST SP 800-63-3 (AAL3/IAL2), W3C DID v1.0, FL Statute § 119.071, FIPS 140-3',
    hashSignature: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    pdfUrl: '/documents/mia-via-privacy-data-boundaries-v1.0.pdf'
  },
  {
    id: 'fpl-portmiami-grid-05',
    documentNumber: 'PORT-SHORE-2026-G1',
    title: 'PortMiami Shore Power Microgrid & High-Voltage Demand Response Settlement System',
    category: 'Energy & Grid',
    classification: 'TECHNICAL SPECIFICATION',
    status: 'Ready',
    version: '2.5.0',
    lastUpdated: 'June 30, 2026',
    custodian: 'PortMiami Engineering / Florida Power & Light (FPL) Industrial Interconnect',
    pageCount: 12,
    executiveSummary: 'Automated 13.8kV/60Hz shore power connection infrastructure coordinating real-time dynamic load shedding and carbon credit issuance for cruise and cargo berths at PortMiami.',
    stakeholderValue: 'Cuts diesel auxiliary engine emissions at berth by 94%, eliminating an estimated 48,000 tons of CO2 emissions annually while participating in FPL real-time demand response grid stabilization.',
    technicalArchitecture: [
      'Automated high-voltage connection telemetry logging Megawatt consumption per vessel in 1-second intervals.',
      'Automated renewable energy certificate (REC) and carbon offset minting engine based on clean grid mix data.',
      'Substation-level automated load governor to prevent mainland downtown Miami substation spikes.',
      'Smart billing reconciliation gateway generating immutable settlement manifests for cruise lines.'
    ],
    metrics: [
      { label: 'Emissions Reduction', metric: 'Berth CO2 Offset', baseline: '0% (Auxiliary Idle)', target: '94.2%' },
      { label: 'Grid Interconnect Time', metric: 'Vessel Synchronization', baseline: '45 minutes', target: '8 minutes' },
      { label: 'Peak Capacity', metric: 'Simultaneous Berths', baseline: '1 Vessel (Test)', target: '5 Mega-Vessels' },
      { label: 'Settlement Speed', metric: 'Energy Billing', baseline: '30-day invoice', target: 'Real-time at Disconnect' }
    ],
    complianceFramework: 'IEC/IEEE 80005-1 (High Voltage Shore Connection), FERC Order 888, EPA Ports Initiative',
    hashSignature: '0x99a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8',
    pdfUrl: '/documents/mia-via-governance-assurance-v1.0.pdf'
  }
];

export function generateDocumentPDF(doc: DocumentArtifact) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const PRIMARY_COLOR: [number, number, number] = [15, 23, 42];
  const ACCENT_COLOR: [number, number, number] = [13, 148, 136];
  const MUTED_TEXT: [number, number, number] = [100, 116, 139];
  const BORDER_COLOR: [number, number, number] = [226, 232, 240];

  pdf.setFillColor(...PRIMARY_COLOR);
  pdf.rect(0, 0, 210, 8, 'F');
  pdf.setFillColor(...ACCENT_COLOR);
  pdf.rect(0, 8, 210, 2, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...ACCENT_COLOR);
  pdf.text('MIAMI-DADE COUNTY CIVIC INFRASTRUCTURE PLATFORM', 14, 20);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(...MUTED_TEXT);
  pdf.text(`OFFICIAL SPECIFICATION ARTIFACT | DOC ID: ${doc.documentNumber}`, 14, 25);
  pdf.text(`PILOT SANDBOX RUNTIME — NO LIVE MUNICIPAL LEDGERS CONNECTED`, 14, 29);

  pdf.setDrawColor(...BORDER_COLOR);
  pdf.setLineWidth(0.5);
  pdf.line(14, 33, 196, 33);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(...PRIMARY_COLOR);

  const titleLines = pdf.splitTextToSize(doc.title, 180);
  pdf.text(titleLines, 14, 43);

  let currentY = 43 + titleLines.length * 6 + 4;

  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(...BORDER_COLOR);
  pdf.roundedRect(14, currentY, 182, 34, 2, 2, 'FD');

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...MUTED_TEXT);

  pdf.text('CATEGORY', 18, currentY + 7);
  pdf.text('CLASSIFICATION', 75, currentY + 7);
  pdf.text('STATUS & VERSION', 135, currentY + 7);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(...PRIMARY_COLOR);
  pdf.text(doc.category, 18, currentY + 12);
  pdf.text(doc.classification, 75, currentY + 12);
  pdf.text(`${doc.status} (v${doc.version})`, 135, currentY + 12);

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...MUTED_TEXT);
  pdf.text('CUSTODIAN AUTHORITY', 18, currentY + 22);
  pdf.text('EFFECTIVE DATE', 135, currentY + 22);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(...PRIMARY_COLOR);
  pdf.text(pdf.splitTextToSize(doc.custodian, 110), 18, currentY + 27);
  pdf.text(doc.lastUpdated, 135, currentY + 27);

  currentY += 42;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...PRIMARY_COLOR);
  pdf.text('1. EXECUTIVE SUMMARY & OBJECTIVE', 14, currentY);

  currentY += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(51, 65, 85);
  const summaryLines = pdf.splitTextToSize(doc.executiveSummary, 182);
  pdf.text(summaryLines, 14, currentY);

  currentY += summaryLines.length * 5 + 6;

  pdf.setFillColor(240, 253, 250);
  pdf.setDrawColor(204, 251, 241);
  const valueLines = pdf.splitTextToSize(doc.stakeholderValue, 174);
  const boxHeight = valueLines.length * 5 + 14;

  pdf.roundedRect(14, currentY, 182, boxHeight, 2, 2, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(...ACCENT_COLOR);
  pdf.text('MUNICIPAL STAKEHOLDER DECISION VALUE & ROI', 18, currentY + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(15, 118, 110);
  pdf.text(valueLines, 18, currentY + 12);

  currentY += boxHeight + 8;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...PRIMARY_COLOR);
  pdf.text('2. TECHNICAL ARCHITECTURE & DEPLOYMENT SPECIFICATIONS', 14, currentY);

  currentY += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(51, 65, 85);

  doc.technicalArchitecture.forEach((archItem) => {
    pdf.setFillColor(...ACCENT_COLOR);
    pdf.circle(17, currentY + 1.5, 1, 'F');
    const itemLines = pdf.splitTextToSize(archItem, 172);
    pdf.text(itemLines, 21, currentY + 2.5);
    currentY += itemLines.length * 4.5 + 3;
  });

  currentY += 4;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...PRIMARY_COLOR);
  pdf.text('3. MEASURABLE PERFORMANCE BENCHMARKS & SLAs', 14, currentY);

  currentY += 3;

  pdf.autoTable({
    startY: currentY,
    head: [['Performance Dimension', 'Metric Target', 'Legacy County Baseline', 'VIA Sandbox Target']],
    body: doc.metrics.map(m => [m.label, m.metric, m.baseline, m.target]),
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'left'
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [30, 41, 59]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 45 },
      2: { cellWidth: 45 },
      3: { fontStyle: 'bold', textColor: ACCENT_COLOR, cellWidth: 42 }
    },
    margin: { left: 14, right: 14 }
  });

  const finalY = (pdf as any).lastAutoTable.finalY + 12;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(...MUTED_TEXT);
  pdf.text('STATUTORY & REGULATORY COMPLIANCE ATTESTATION:', 14, finalY);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(51, 65, 85);
  pdf.text(doc.complianceFramework, 14, finalY + 4);

  pdf.setFillColor(241, 245, 249);
  pdf.roundedRect(14, finalY + 8, 182, 12, 1, 1, 'F');
  pdf.setFont('courier', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(...MUTED_TEXT);
  pdf.text(`SHA-256 IMMUTABLE ATTESTATION HASH:\n${doc.hashSignature}`, 17, finalY + 12);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(...MUTED_TEXT);
  pdf.text('Page 1 of 1 — VIA Civic Architecture Verification Release', 14, 290);
  pdf.text('Miami-Dade County Pilot Demonstrator', 145, 290);

  pdf.save(`${doc.documentNumber}_Specification.pdf`);
}
