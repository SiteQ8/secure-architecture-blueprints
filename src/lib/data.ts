export type TrustZone = {
  id: string;
  name: string;
  level: number;
  description: string;
};

export type Node = {
  id: string;
  label: string;
  type: 'compute' | 'database' | 'network' | 'storage' | 'security' | 'client';
  zoneId: string;
};

export type Edge = {
  source: string;
  target: string;
  label: string;
  protocol: string;
};

export type Architecture = {
  zones: TrustZone[];
  nodes: Node[];
  edges: Edge[];
};

export type Resource = {
  id: string;
  type: 'terraform' | 'policy' | 'diagram' | 'runbook';
  title: string;
  description: string;
  content: string;
};

export type Blueprint = {
  id: string;
  title: string;
  description: string;
  category: 'Banking' | 'Infrastructure' | 'Cloud-Native' | 'Fintech';
  complexity: 'Low' | 'Medium' | 'High';
  compliance: string[];
  tags: string[];
  version: string;
  updatedAt: string;
  author: string;
  architecture: Architecture;
  controlIds: string[];
  resources: Resource[];
};

export type Control = {
  id: string;
  domain: string;
  name: string;
  description: string;
  frameworkMappings: {
    nist?: string;
    iso?: string;
    soc2?: string;
    pci?: string;
  };
};

export const MOCK_CONTROLS: Control[] = [
  {
    id: 'CTL-ID-01',
    domain: 'Identity & Access',
    name: 'Multi-Factor Authentication',
    description: 'Enforce MFA for all administrative access and high-risk operations.',
    frameworkMappings: {
      nist: 'IA-2',
      iso: 'A.9.4.2',
      soc2: 'CC6.3',
      pci: '8.3',
    },
  },
  {
    id: 'CTL-NET-01',
    domain: 'Network Security',
    name: 'Micro-segmentation',
    description: 'Isolate workloads at the network level using zero-trust principles.',
    frameworkMappings: {
      nist: 'SC-7',
      iso: 'A.13.1.3',
      pci: '1.2.1',
    },
  },
  {
    id: 'CTL-DAT-01',
    domain: 'Data Protection',
    name: 'Encryption at Rest',
    description: 'Encrypt all sensitive data at rest using AES-256 or equivalent.',
    frameworkMappings: {
      nist: 'SC-28',
      iso: 'A.10.1.1',
      soc2: 'CC6.1',
      pci: '3.4',
    },
  },
  {
    id: 'CTL-DAT-02',
    domain: 'Data Protection',
    name: 'Encryption in Transit',
    description: 'Use TLS 1.2+ for all data in transit across untrusted networks.',
    frameworkMappings: {
      nist: 'SC-8',
      iso: 'A.10.1.1',
      soc2: 'CC6.1',
      pci: '4.1',
    },
  },
  {
    id: 'CTL-LOG-01',
    domain: 'Logging & Monitoring',
    name: 'Centralized Audit Logging',
    description: 'Forward all security events to a centralized SIEM with immutable storage.',
    frameworkMappings: {
      nist: 'AU-2',
      iso: 'A.12.4.1',
      soc2: 'CC7.1',
      pci: '10.5',
    },
  },
];

export const MOCK_BLUEPRINTS: Blueprint[] = [
  {
    id: 'bp-bank-zt',
    title: 'Banking Zero Trust',
    description: 'A comprehensive zero-trust architecture tailored for retail banking environments, emphasizing micro-segmentation and continuous verification.',
    category: 'Banking',
    complexity: 'High',
    compliance: ['PCI-DSS v4', 'SOC2 Type II', 'NIST CSF'],
    tags: ['Zero Trust', 'Micro-segmentation', 'Kubernetes'],
    version: '2.1.0',
    updatedAt: '2024-03-15T10:00:00Z',
    author: 'Security Architecture Team',
    controlIds: ['CTL-ID-01', 'CTL-NET-01', 'CTL-DAT-01', 'CTL-DAT-02', 'CTL-LOG-01'],
    architecture: {
      zones: [
        { id: 'z-untrusted', name: 'Untrusted', level: 0, description: 'Public Internet' },
        { id: 'z-dmz', name: 'DMZ (Ingress)', level: 1, description: 'External facing services' },
        { id: 'z-app', name: 'Application Core', level: 2, description: 'Microservices & Business Logic' },
        { id: 'z-data', name: 'Secure Data Enclave', level: 3, description: 'Highly restricted data storage' },
      ],
      nodes: [
        { id: 'n-client', label: 'Mobile/Web App', type: 'client', zoneId: 'z-untrusted' },
        { id: 'n-waf', label: 'WAF & API Gateway', type: 'security', zoneId: 'z-dmz' },
        { id: 'n-auth', label: 'Identity Provider', type: 'security', zoneId: 'z-dmz' },
        { id: 'n-svc-a', label: 'Account Service', type: 'compute', zoneId: 'z-app' },
        { id: 'n-svc-b', label: 'Tx Service', type: 'compute', zoneId: 'z-app' },
        { id: 'n-db-main', label: 'Core Ledger DB', type: 'database', zoneId: 'z-data' },
        { id: 'n-db-vault', label: 'Token Vault', type: 'database', zoneId: 'z-data' },
      ],
      edges: [
        { source: 'n-client', target: 'n-waf', label: 'HTTPS', protocol: 'TLS 1.3' },
        { source: 'n-client', target: 'n-auth', label: 'OIDC', protocol: 'TLS 1.3' },
        { source: 'n-waf', target: 'n-svc-a', label: 'mTLS API', protocol: 'mTLS' },
        { source: 'n-waf', target: 'n-svc-b', label: 'mTLS API', protocol: 'mTLS' },
        { source: 'n-svc-a', target: 'n-db-main', label: 'SQL', protocol: 'mTLS' },
        { source: 'n-svc-b', target: 'n-db-main', label: 'SQL', protocol: 'mTLS' },
        { source: 'n-svc-b', target: 'n-db-vault', label: 'gRPC', protocol: 'mTLS' },
      ],
    },
    resources: [
      {
        id: 'r-tf-ingress',
        type: 'terraform',
        title: 'WAF Ingress Configuration',
        description: 'Terraform module for deploying the API gateway with WAF rules.',
        content: `module "api_gateway" {
  source = "terraform-aws-modules/apigateway-v2/aws"
  name   = "banking-core-api"

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["https://banking.example.com"]
  }
}`,
      },
      {
        id: 'r-pol-network',
        type: 'policy',
        title: 'NetworkPolicy: App to Data',
        description: 'Kubernetes NetworkPolicy restricting access to the data zone.',
        content: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-app-to-data
  namespace: secure-data
spec:
  podSelector:
    matchLabels:
      tier: database
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          tier: application
    ports:
    - protocol: TCP
      port: 5432`,
      },
    ],
  },
  {
    id: 'bp-ot-bms',
    title: 'OT/BMS Segmentation',
    description: 'Purdue model inspired segmentation architecture for Operational Technology and Building Management Systems.',
    category: 'Infrastructure',
    complexity: 'Medium',
    compliance: ['IEC 62443', 'NIST CSF'],
    tags: ['OT', 'SCADA', 'Purdue Model', 'Airgap'],
    version: '1.4.2',
    updatedAt: '2024-02-28T14:30:00Z',
    author: 'Industrial Cyber Team',
    controlIds: ['CTL-NET-01', 'CTL-LOG-01'],
    architecture: {
      zones: [
        { id: 'z-enterprise', name: 'Enterprise Zone (L4)', level: 0, description: 'Corporate IT Network' },
        { id: 'z-idmz', name: 'Industrial DMZ (L3.5)', level: 1, description: 'Boundary between IT and OT' },
        { id: 'z-operations', name: 'Operations Zone (L3)', level: 2, description: 'Site operations and control' },
        { id: 'z-control', name: 'Control Zone (L2)', level: 3, description: 'Supervisory controls (HMI, SCADA)' },
      ],
      nodes: [
        { id: 'n-corp', label: 'Corp Workstations', type: 'client', zoneId: 'z-enterprise' },
        { id: 'n-historian-fw', label: 'IT/OT Firewall', type: 'network', zoneId: 'z-idmz' },
        { id: 'n-historian', label: 'Data Historian', type: 'database', zoneId: 'z-idmz' },
        { id: 'n-scada', label: 'SCADA Server', type: 'compute', zoneId: 'z-operations' },
        { id: 'n-plc', label: 'PLC Network', type: 'compute', zoneId: 'z-control' },
      ],
      edges: [
        { source: 'n-corp', target: 'n-historian-fw', label: 'RDP/HTTPS', protocol: 'TCP' },
        { source: 'n-historian-fw', target: 'n-historian', label: 'Data Read', protocol: 'SQL' },
        { source: 'n-scada', target: 'n-historian', label: 'Data Push', protocol: 'OPC-UA' },
        { source: 'n-plc', target: 'n-scada', label: 'Control Logic', protocol: 'Modbus/TCP' },
      ],
    },
    resources: [],
  },
  {
    id: 'bp-cloud-saas',
    title: 'Cloud-Native SaaS',
    description: 'Standardized reference architecture for a B2B SaaS platform deployed entirely on cloud-native managed services.',
    category: 'Cloud-Native',
    complexity: 'Low',
    compliance: ['SOC2 Type II', 'ISO 27001'],
    tags: ['AWS', 'Serverless', 'SaaS', 'B2B'],
    version: '3.0.0',
    updatedAt: '2024-04-01T09:15:00Z',
    author: 'Cloud Center of Excellence',
    controlIds: ['CTL-ID-01', 'CTL-DAT-01', 'CTL-DAT-02'],
    architecture: {
      zones: [
        { id: 'z-public', name: 'Public Internet', level: 0, description: 'Any source' },
        { id: 'z-edge', name: 'Edge Services', level: 1, description: 'CDN & WAF' },
        { id: 'z-compute', name: 'Serverless Compute', level: 2, description: 'Lambda / Fargate' },
        { id: 'z-managed-data', name: 'Managed Data', level: 3, description: 'DynamoDB / S3' },
      ],
      nodes: [
        { id: 'n-user', label: 'SaaS Tenant', type: 'client', zoneId: 'z-public' },
        { id: 'n-cdn', label: 'CloudFront+WAF', type: 'network', zoneId: 'z-edge' },
        { id: 'n-api', label: 'API Gateway', type: 'network', zoneId: 'z-edge' },
        { id: 'n-lambda', label: 'Business Logic', type: 'compute', zoneId: 'z-compute' },
        { id: 'n-ddb', label: 'Tenant Data', type: 'database', zoneId: 'z-managed-data' },
      ],
      edges: [
        { source: 'n-user', target: 'n-cdn', label: 'Static Assets', protocol: 'HTTPS' },
        { source: 'n-user', target: 'n-api', label: 'API Requests', protocol: 'HTTPS' },
        { source: 'n-api', target: 'n-lambda', label: 'Invoke', protocol: 'IAM' },
        { source: 'n-lambda', target: 'n-ddb', label: 'Read/Write', protocol: 'IAM+TLS' },
      ],
    },
    resources: [],
  },
  {
    id: 'bp-fintech-pay',
    title: 'Fintech Payment Platform',
    description: 'High-throughput, low-latency payment processing architecture with stringent HSM integration and PCI compliance.',
    category: 'Fintech',
    complexity: 'High',
    compliance: ['PCI-DSS v4'],
    tags: ['Payments', 'HSM', 'Kafka', 'Event-Driven'],
    version: '1.1.5',
    updatedAt: '2024-03-20T11:45:00Z',
    author: 'Payments Engineering',
    controlIds: ['CTL-ID-01', 'CTL-DAT-01', 'CTL-DAT-02', 'CTL-LOG-01', 'CTL-NET-01'],
    architecture: {
      zones: [
        { id: 'z-ext', name: 'External Networks', level: 0, description: 'Merchants & Gateways' },
        { id: 'z-ingress', name: 'Payment Ingress', level: 1, description: 'API & Tokenization' },
        { id: 'z-processing', name: 'Core Processing', level: 2, description: 'Ledger & Routing' },
        { id: 'z-hsm', name: 'Crypto Boundary', level: 3, description: 'Hardware Security Modules' },
      ],
      nodes: [
        { id: 'n-merch', label: 'Merchant Gateway', type: 'client', zoneId: 'z-ext' },
        { id: 'n-tok', label: 'Tokenization API', type: 'compute', zoneId: 'z-ingress' },
        { id: 'n-kafka', label: 'Event Bus', type: 'network', zoneId: 'z-processing' },
        { id: 'n-ledger', label: 'Ledger Service', type: 'compute', zoneId: 'z-processing' },
        { id: 'n-hsm', label: 'Payment HSM', type: 'security', zoneId: 'z-hsm' },
      ],
      edges: [
        { source: 'n-merch', target: 'n-tok', label: 'Card Data', protocol: 'TLS 1.3' },
        { source: 'n-tok', target: 'n-hsm', label: 'Encrypt/Tokenize', protocol: 'TCP/IPsec' },
        { source: 'n-tok', target: 'n-kafka', label: 'Produce Event', protocol: 'TLS' },
        { source: 'n-kafka', target: 'n-ledger', label: 'Consume Event', protocol: 'TLS' },
      ],
    },
    resources: [
      {
        id: 'r-runbook-key',
        type: 'runbook',
        title: 'HSM Key Rotation Ceremony',
        description: 'Procedure for quarterly master key rotation.',
        content: `# HSM Key Rotation Ceremony

## Prerequisites
- 3 of 5 Key Custodians present
- Physical access to secure facility
- Smart cards & PINs

## Procedure
1. Disable automatic failover in HSM cluster configuration.
2. Custodian 1 & 2 authenticate to Primary HSM.
3. Initiate Master Key Generation procedure.
4. Export wrapped key components to smart cards.
5. Re-enable automatic failover.
6. Verify transaction processing logs.`,
      }
    ],
  }
];
