import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import { DefaultAzureCredential } from "@azure/identity";

interface NetworkStatus {
  region: string;
  status: "online" | "maintenance" | "offline";
  coverage: number;
  speed: {
    download: number;
    upload: number;
    latency: number;
  };
  lastUpdated: string;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const credential = new DefaultAzureCredential();
  
  try {
    const graphClient = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken("https://graph.microsoft.com/.default");
          return token.token;
        }
      }
    });

    const myanmarRegions: NetworkStatus[] = [
      {
        region: "Yangon",
        status: "online",
        coverage: 98.5,
        speed: { download: 150.2, upload: 45.8, latency: 12 },
        lastUpdated: new Date().toISOString()
      },
      {
        region: "Mandalay", 
        status: "online",
        coverage: 96.8,
        speed: { download: 142.1, upload: 42.3, latency: 15 },
        lastUpdated: new Date().toISOString()
      },
      {
        region: "Naypyitaw",
        status: "online", 
        coverage: 99.2,
        speed: { download: 165.7, upload: 52.1, latency: 8 },
        lastUpdated: new Date().toISOString()
      },
      {
        region: "Bagan",
        status: "online",
        coverage: 94.3,
        speed: { download: 128.9, upload: 38.7, latency: 18 },
        lastUpdated: new Date().toISOString()
      },
      {
        region: "Taunggyi",
        status: "online",
        coverage: 92.1,
        speed: { download: 118.4, upload: 35.2, latency: 22 },
        lastUpdated: new Date().toISOString()
      }
    ];

    await graphClient
      .sites("esimmyanmar.sharepoint.com")
      .lists("NetworkStatus")
      .items
      .post({
        fields: {
          Title: "Network Status Update",
          Data: JSON.stringify(myanmarRegions),
          Timestamp: new Date().toISOString()
        }
      });

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: {
        success: true,
        data: myanmarRegions,
        totalRegions: myanmarRegions.length,
        averageCoverage: myanmarRegions.reduce((acc, r) => acc + r.coverage, 0) / myanmarRegions.length
      }
    };

  } catch (error) {
    context.log.error("Network status error:", error);
    context.res = {
      status: 500,
      body: { error: "Failed to fetch network status" }
    };
  }
};

export default httpTrigger;