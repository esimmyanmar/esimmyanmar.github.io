Deployment secrets and GitHub Actions configuration

Required GitHub repository secrets

- `AZURE_STATIC_WEB_APPS_API_TOKEN` - token for Azure Static Web Apps deployment (use `az staticwebapp list` or portal to create a deployment token)
- `AZURE_SUBSCRIPTION_ID` - Azure subscription id used for resource provisioning
- `AZURE_CREDENTIALS` - JSON service principal used by some Azure Actions (optional)
- `PP_CLIENT_ID` - Power Platform service principal client id for `pac` CLI
- `PP_CLIENT_SECRET` - Power Platform service principal client secret
- `PP_TENANT` - Azure AD tenant ID for Power Platform authentication
- `PP_ENV_URL` - Power Platform environment URL (e.g. https://yourenv.crm.dynamics.com)
- `NEXT_PUBLIC_MICROSOFT_CLIENT_ID` - Microsoft Entra application (public client) id
- `MICROSOFT_CLIENT_SECRET` - Microsoft application secret (store only in GitHub secrets, not in code)
- `NEXT_PUBLIC_COPILOT_BOT_ID` - Copilot Studio bot id for embedded assistant
- `APPLICATION_INSIGHTS_KEY` - App Insights instrumentation key for production
- `SIGNALR_CONNECTION_STRING` - SignalR connection for real-time updates (store as secret)
- `TEAMS_WEBHOOK_URL` - Teams webhook for automated notifications (optional)

How to set secrets

1. In GitHub, go to your repository -> Settings -> Secrets and variables -> Actions -> New repository secret.
2. Add the names above and their values.
3. For Azure deployment token, create an Azure Static Web Apps deployment token and save it to `AZURE_STATIC_WEB_APPS_API_TOKEN`.

Notes

- Never commit secrets into the repository or into `.env.example`.
- For local development, copy `.env.example` to `.env.local` and provide non-production values.
- The Power Platform `pac` CLI workflow requires a service principal with appropriate permissions on the target environment.
