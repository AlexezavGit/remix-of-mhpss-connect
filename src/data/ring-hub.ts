// Realistic mock data for the Ring Hub: Donor, Provider and Beneficiary
// pathways through outcome-linked payment flow.
// Structures intentionally mirror real standards (HL7 FHIR R4,
// W3C Verifiable Credentials, ISO 20022 pain.001/camt.054) so they can
// later serve as a fallback when live APIs go down.

export type PathwayId = "donor" | "provider" | "beneficiary";

export interface TechMeta {
  /** e.g. "FHIR R4 · Patient", "VC · ProviderCredential", "ISO 20022 · pain.001" */
  standard: string;
  /** Short technical hint shown in Architect View */
  hint: string;
  /** Raw mock payload for hover / Architect inspection */
  sample: Record<string, unknown>;
}

export interface PathwayStep {
  id: string;
  label: { ua: string; en: string };
  /** Donor-facing one-liner (plain language) */
  donor: { ua: string; en: string };
  /** Architect-facing one-liner (technical) */
  architect: { ua: string; en: string };
  tech: TechMeta;
}

export interface Pathway {
  id: PathwayId;
  title: { ua: string; en: string };
  /** Donor-friendly description */
  donor: { ua: string; en: string };
  /** Technical description */
  architect: { ua: string; en: string };
  steps: PathwayStep[];
  /** Outer-ring integration ports unique to this pathway */
  ports: string[];
}

export const PATHWAYS: Pathway[] = [
  {
    id: "donor",
    title: { ua: "Шлях донора", en: "Donor pathway" },
    donor: {
      ua: "Внесок прив'язаний до конкретного протоколу. Виплата — лише після підтвердженого результату.",
      en: "Each contribution is bound to a treatment protocol. Payment releases only after a verified outcome.",
    },
    architect: {
      ua: "ISO 20022 pain.001 → escrow → trigger via FHIR Observation → camt.054 settlement.",
      en: "ISO 20022 pain.001 → escrow → trigger on FHIR Observation → camt.054 settlement.",
    },
    steps: [
      {
        id: "d1",
        label: { ua: "Внесок", en: "Contribution" },
        donor: {
          ua: "Донор обирає протокол і вносить кошти на escrow.",
          en: "Donor picks a protocol and funds an escrow.",
        },
        architect: {
          ua: "pain.001.001.09 з референсом протоколу.",
          en: "pain.001.001.09 with protocol reference.",
        },
        tech: {
          standard: "ISO 20022 · pain.001",
          hint: "CustomerCreditTransferInitiation",
          sample: {
            msgId: "FA-2026-04-13-0001",
            ccy: "EUR",
            amount: 12000,
            protocolRef: "PTSD-CBT-12W-A",
          },
        },
      },
      {
        id: "d2",
        label: { ua: "Дашборди верифікації", en: "Verification" },
        donor: {
          ua: "Прозоро видно, як кошти зарезервовано і до якого протоколу прив'язано.",
          en: "See funds reserved and bound to a specific protocol.",
        },
        architect: {
          ua: "Escrow state + W3C VC PaymentBinding (issuer: NBU sandbox).",
          en: "Escrow state + W3C VC PaymentBinding (issuer: NBU sandbox).",
        },
        tech: {
          standard: "W3C VC · PaymentBinding",
          hint: "Verifiable Credential, JSON-LD",
          sample: {
            "@context": ["https://www.w3.org/ns/credentials/v2"],
            type: ["VerifiableCredential", "PaymentBinding"],
            issuer: "did:web:sandbox.bank.gov.ua",
            credentialSubject: {
              escrowId: "esc_8H2K",
              protocolRef: "PTSD-CBT-12W-A",
            },
          },
        },
      },
      {
        id: "d3",
        label: { ua: "Підтвердження результату", en: "Outcome confirmation" },
        donor: {
          ua: "98% виплат прив'язані до підтверджених клінічних результатів.",
          en: "98% of payments tied to a verified clinical outcome.",
        },
        architect: {
          ua: "FHIR Observation із PROM-шкали → smart-contract trigger.",
          en: "FHIR Observation from a PROM scale → smart-contract trigger.",
        },
        tech: {
          standard: "FHIR R4 · Observation",
          hint: "code: PHQ-9 reduction ≥50%",
          sample: {
            resourceType: "Observation",
            status: "final",
            code: { coding: [{ system: "http://loinc.org", code: "44261-6", display: "PHQ-9 total score" }] },
            valueInteger: 6,
            interpretation: [{ text: "Clinically meaningful improvement" }],
          },
        },
      },
      {
        id: "d4",
        label: { ua: "Сетлмент", en: "Settlement" },
        donor: {
          ua: "Виплата провайдеру автоматична, з повним audit trail.",
          en: "Provider settlement is automatic, with a full audit trail.",
        },
        architect: {
          ua: "camt.054 + on-chain receipt (Polygon zkEVM).",
          en: "camt.054 + on-chain receipt (Polygon zkEVM).",
        },
        tech: {
          standard: "ISO 20022 · camt.054",
          hint: "BankToCustomerDebitCreditNotification",
          sample: {
            msgId: "FA-SET-2026-04-19-0042",
            ccy: "EUR",
            amount: 12000,
            txHash: "0x9f…c3a1",
          },
        },
      },
    ],
    ports: ["W3C VC Registry", "Donor reports"],
  },
  {
    id: "provider",
    title: { ua: "Шлях провайдера", en: "Provider pathway" },
    donor: {
      ua: "Провайдер реєструється, веде пацієнтів і отримує виплати за фактом результату.",
      en: "Providers onboard, manage patients and get paid for verified outcomes.",
    },
    architect: {
      ua: "VC ProviderCredential → FHIR Encounter/CarePlan → Observation → payment trigger.",
      en: "VC ProviderCredential → FHIR Encounter/CarePlan → Observation → payment trigger.",
    },
    steps: [
      {
        id: "p1",
        label: { ua: "Онбординг", en: "Onboarding" },
        donor: {
          ua: "Перевірка кваліфікації через довірений реєстр.",
          en: "Credentials verified against a trusted registry.",
        },
        architect: {
          ua: "W3C VC ProviderCredential, issuer: МОЗ/НПА.",
          en: "W3C VC ProviderCredential, issuer: MoH/NPA.",
        },
        tech: {
          standard: "W3C VC · ProviderCredential",
          hint: "did:web:registry.moz.gov.ua",
          sample: {
            type: ["VerifiableCredential", "ProviderCredential"],
            credentialSubject: { id: "did:fa:prov:08213", scope: ["CBT", "EMDR"] },
          },
        },
      },
      {
        id: "p2",
        label: { ua: "Сесія", en: "Session" },
        donor: {
          ua: "Кожна сесія фіксується з триверифікаційним oracle.",
          en: "Each session is logged via a triple-verification oracle.",
        },
        architect: {
          ua: "FHIR Encounter + Triple Verification (provider/peer/system).",
          en: "FHIR Encounter + Triple Verification (provider/peer/system).",
        },
        tech: {
          standard: "FHIR R4 · Encounter",
          hint: "class: VR (virtual)",
          sample: {
            resourceType: "Encounter",
            status: "finished",
            class: { code: "VR", display: "virtual" },
            subject: { reference: "Patient/anon-7A1F" },
          },
        },
      },
      {
        id: "p3",
        label: { ua: "Оцінювання", en: "Assessment" },
        donor: {
          ua: "Стандартизовані шкали оцінюють динаміку симптомів.",
          en: "Standardised scales score symptom dynamics.",
        },
        architect: {
          ua: "FHIR QuestionnaireResponse (PHQ-9 / PCL-5 / GAD-7).",
          en: "FHIR QuestionnaireResponse (PHQ-9 / PCL-5 / GAD-7).",
        },
        tech: {
          standard: "FHIR R4 · QuestionnaireResponse",
          hint: "LOINC-coded scales",
          sample: {
            resourceType: "QuestionnaireResponse",
            questionnaire: "Questionnaire/PHQ-9",
            status: "completed",
          },
        },
      },
      {
        id: "p4",
        label: { ua: "Виплата", en: "Payment trigger" },
        donor: {
          ua: "Підтверджений результат → автоматична виплата.",
          en: "Verified outcome → automatic settlement.",
        },
        architect: {
          ua: "Observation → escrow release → camt.054.",
          en: "Observation → escrow release → camt.054.",
        },
        tech: {
          standard: "ISO 20022 · camt.054",
          hint: "Outcome-linked release",
          sample: { amount: 480, ccy: "EUR", per: "session" },
        },
      },
    ],
    ports: ["ЄСОЗ", "Трембіта"],
  },
  {
    id: "beneficiary",
    title: { ua: "Шлях бенефіціара", en: "Beneficiary pathway" },
    donor: {
      ua: "Бенефіціар проходить шлях від скринінгу до повернення в життя — з повагою до приватності.",
      en: "From screening to recovery — with privacy preserved end to end.",
    },
    architect: {
      ua: "FHIR Patient (pseudo) → CarePlan → Observation → Impact feedback.",
      en: "FHIR Patient (pseudo) → CarePlan → Observation → Impact feedback.",
    },
    steps: [
      {
        id: "b1",
        label: { ua: "Скринінг", en: "Screening" },
        donor: {
          ua: "Початкове оцінювання визначає протокол допомоги.",
          en: "Initial assessment selects the care protocol.",
        },
        architect: {
          ua: "FHIR Patient (pseudonymised) + initial Observation set.",
          en: "FHIR Patient (pseudonymised) + initial Observation set.",
        },
        tech: {
          standard: "FHIR R4 · Patient",
          hint: "Pseudonymised, hashed MRN",
          sample: { resourceType: "Patient", id: "anon-7A1F", gender: "unknown" },
        },
      },
      {
        id: "b2",
        label: { ua: "Протокол", en: "Protocol" },
        donor: {
          ua: "Курс із 6–12 сесій за обраним протоколом.",
          en: "A 6–12 session course on the chosen protocol.",
        },
        architect: {
          ua: "FHIR CarePlan, status: active.",
          en: "FHIR CarePlan, status: active.",
        },
        tech: {
          standard: "FHIR R4 · CarePlan",
          hint: "category: mental-health",
          sample: { resourceType: "CarePlan", status: "active", intent: "plan" },
        },
      },
      {
        id: "b3",
        label: { ua: "Вимірювання", en: "Measurement" },
        donor: {
          ua: "Прогрес видно на кожному кроці — об'єктивно, не зі слів.",
          en: "Progress is visible at each step — measured, not declared.",
        },
        architect: {
          ua: "Repeating Observation sets, longitudinal score delta.",
          en: "Repeating Observation sets, longitudinal score delta.",
        },
        tech: {
          standard: "FHIR R4 · Observation (delta)",
          hint: "PHQ-9 18 → 6",
          sample: { baseline: 18, current: 6, deltaPct: -67 },
        },
      },
      {
        id: "b4",
        label: { ua: "Зворотний зв'язок", en: "Impact feedback" },
        donor: {
          ua: "Анонімізований результат повертається у звіти донорам та державі.",
          en: "Anonymised outcomes flow back to donor and state reports.",
        },
        architect: {
          ua: "Aggregated MeasureReport → donor reporting layer.",
          en: "Aggregated MeasureReport → donor reporting layer.",
        },
        tech: {
          standard: "FHIR R4 · MeasureReport",
          hint: "type: summary",
          sample: { resourceType: "MeasureReport", type: "summary", measure: "MHPSS-COMPLETION" },
        },
      },
    ],
    ports: ["ЄСОЗ", "Donor reports"],
  },
];

export const INTEGRATION_PORTS: Array<{
  id: string;
  label: string;
  /** Angle in degrees around the ring (0° = top / north). */
  deg: number;
  desc: { ua: string; en: string };
}> = [
  {
    id: "esoz",
    label: "ЄСОЗ",
    deg: 45,
    desc: {
      ua: "Єдина державна електронна система охорони здоров'я. Точки: Patient, Encounter, Observation.",
      en: "Ukrainian state EHR. Integration points: Patient, Encounter, Observation.",
    },
  },
  {
    id: "trembita",
    label: "Трембіта",
    deg: 105,
    desc: {
      ua: "Шина державної взаємодії. Точки обміну верифікованими подіями.",
      en: "State interoperability bus. Verified-event exchange points.",
    },
  },
  {
    id: "fintech",
    label: "Фінтех",
    deg: 180,
    desc: {
      ua: "Банківські рейки, ескроу за протоколом, ISO 20022 pain.001 / camt.054, on-chain receipt.",
      en: "Banking rails, protocol-bound escrow, ISO 20022 pain.001 / camt.054, on-chain receipt.",
    },
  },
  {
    id: "donor",
    label: "Донорські звіти",
    deg: 255,
    desc: {
      ua: "Агрегована звітність з результатів для донорів усіх типів (приватні, бі/мульти, IFI).",
      en: "Aggregated outcome reports for donors of all types (private, bi/multi, IFIs).",
    },
  },
  {
    id: "vc",
    label: "W3C VC · реєстр",
    deg: 315,
    desc: {
      ua: "Реєстр верифікованих облікових даних провайдерів і валідаторів.",
      en: "Registry of provider and validator verifiable credentials.",
    },
  },
];
