// CHANGE: NetLync Entitlements-as-a-Service API client with mock responses

interface EntitlementCheckRequest {
  deviceId?: string
  tac?: string
  imei?: string
}

interface EntitlementCheckResponse {
  eligible: boolean
  carrier: string
  availableCarriers: string[]
  profileId?: string
  message: string
}

interface ActivationResponse {
  success: boolean
  qrCode: string
  profileId: string
  expiryDate: string
  downloadCode: string
}

interface DashboardProfile {
  profileId: string
  carrier: string
  status: "active" | "pending" | "expired"
  dataUsed: string
  dataTotal: string
  expiryDate: string
  activationDate: string
}

export const eaasService = {
  async checkEntitlement(request: EntitlementCheckRequest): Promise<EntitlementCheckResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const carriers = ["ATOM", "Mytel", "MPT", "U9"]
    const isEligible = Math.random() > 0.2

    return {
      eligible: isEligible,
      carrier: isEligible ? carriers[Math.floor(Math.random() * carriers.length)] : "",
      availableCarriers: isEligible ? carriers : [],
      profileId: isEligible ? `LPA:1$${Math.random().toString(36).substring(7)}` : undefined,
      message: isEligible ? "Device is eligible for eSIM provisioning" : "Device not eligible for this region",
    }
  },

  async activateProfile(carrier: string): Promise<ActivationResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const qrCodeData = `https://profile.netlync.eaas/${Math.random().toString(36).substring(7)}`
    const qrCanvas = new OffscreenCanvas(300, 300)
    const ctx = qrCanvas.getContext("2d")

    if (ctx) {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 300, 300)
      ctx.fillStyle = "#000000"
      ctx.fillRect(50, 50, 200, 200)
    }

    return {
      success: true,
      qrCode: qrCodeData,
      profileId: `LPA:1$${Math.random().toString(36).substring(7)}`,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      downloadCode: Math.random().toString(36).substring(2, 15).toUpperCase(),
    }
  },

  async getDashboard(): Promise<DashboardProfile[]> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return [
      {
        profileId: "LPA:1$abcd1234",
        carrier: "MPT",
        status: "active",
        dataUsed: "2.3GB",
        dataTotal: "6GB",
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        activationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        profileId: "LPA:1$efgh5678",
        carrier: "ATOM",
        status: "pending",
        dataUsed: "0GB",
        dataTotal: "10GB",
        expiryDate: new Date(Date.now() + 330 * 24 * 60 * 60 * 1000).toISOString(),
        activationDate: new Date().toISOString(),
      },
    ]
  },
}

export type { EntitlementCheckRequest, EntitlementCheckResponse, ActivationResponse, DashboardProfile }
