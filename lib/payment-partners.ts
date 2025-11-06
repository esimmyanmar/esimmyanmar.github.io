// CHANGE: Payment gateway partners configuration with Myanmar-specific providers

export interface PaymentPartner {
  id: string
  name: string
  displayName: string
  icon: string
  color: string
  url: string
  regions: string[]
  supportedCurrencies: string[]
  features: string[]
}

export const paymentPartners: PaymentPartner[] = [
  {
    id: "wavepay",
    name: "WavePay",
    displayName: "WavePay",
    icon: "wave",
    color: "#1F9FFF",
    url: "https://wavemoney.com.mm",
    regions: ["Myanmar", "Thailand"],
    supportedCurrencies: ["MMK", "THB"],
    features: ["Mobile Money", "QR Code", "Bill Payment"],
  },
  {
    id: "ayapay",
    name: "AYA Pay",
    displayName: "AYA Pay",
    icon: "credit-card",
    color: "#007BFF",
    url: "https://ayapay.com",
    regions: ["Myanmar"],
    supportedCurrencies: ["MMK"],
    features: ["Digital Wallet", "Transfers", "Bill Payment"],
  },
  {
    id: "uabpay",
    name: "UAB Pay",
    displayName: "UAB Pay",
    icon: "credit-card",
    color: "#28A745",
    url: "https://uabpay.com.mm",
    regions: ["Myanmar"],
    supportedCurrencies: ["MMK"],
    features: ["Bank Integration", "Transfers", "Bill Payment"],
  },
  {
    id: "mmqr",
    name: "MMQR",
    displayName: "Myanmar QR",
    icon: "qr-code",
    color: "#FF6B6B",
    url: "https://myanmarpay.com.mm",
    regions: ["Myanmar"],
    supportedCurrencies: ["MMK"],
    features: ["QR Code", "Merchant Payment", "Transfers"],
  },
  {
    id: "mpu",
    name: "MPU",
    displayName: "Myanmar Payment Union",
    icon: "network",
    color: "#FFA500",
    url: "https://myanmarpaymentunion.com",
    regions: ["Myanmar"],
    supportedCurrencies: ["MMK"],
    features: ["Bank Network", "Transfers", "Settlement"],
  },
  {
    id: "upi",
    name: "UPI",
    displayName: "Unified Payments Interface",
    icon: "smartphone",
    color: "#7851A9",
    url: "https://npci.org.in/upi",
    regions: ["India", "ASEAN"],
    supportedCurrencies: ["INR"],
    features: ["Mobile Payment", "QR Code", "Transfers"],
  },
  {
    id: "visa",
    name: "VISA",
    displayName: "VISA",
    icon: "credit-card",
    color: "#1A1F71",
    url: "https://visa.com",
    regions: ["Global"],
    supportedCurrencies: ["USD", "MMK", "THB", "SGD"],
    features: ["Card Payment", "Global", "Installments"],
  },
  {
    id: "mastercard",
    name: "Mastercard",
    displayName: "Mastercard",
    icon: "credit-card",
    color: "#EB001B",
    url: "https://mastercard.com",
    regions: ["Global"],
    supportedCurrencies: ["USD", "MMK", "THB", "SGD"],
    features: ["Card Payment", "Global", "Installments"],
  },
]

export const financialPartners = [
  {
    id: "ayabank",
    name: "AYA Bank",
    displayName: "AYA Bank",
    url: "https://ayabank.com",
    color: "#007BFF",
    region: "Myanmar",
  },
  {
    id: "uabbank",
    name: "UAB Bank",
    displayName: "UAB Bank",
    url: "https://uabbank.com",
    color: "#28A745",
    region: "Myanmar",
  },
]

export const telecomPartners = [
  {
    id: "atom",
    name: "ATOM",
    displayName: "ATOM",
    url: "https://atom.com.mm",
    color: "#FF6B6B",
  },
  {
    id: "mytel",
    name: "Mytel",
    displayName: "Mytel",
    url: "https://mytel.com.mm",
    color: "#4ECDC4",
  },
  {
    id: "mpt",
    name: "MPT",
    displayName: "Myanmar Post and Telecommunications",
    url: "https://mpt.com.mm",
    color: "#FFE66D",
  },
  {
    id: "u9",
    name: "U9",
    displayName: "U9",
    url: "https://u9.com.mm",
    color: "#00FFFF",
  },
]
