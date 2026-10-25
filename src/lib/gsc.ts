import { google } from "googleapis";

export function getSearchConsoleClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  return google.searchconsole({ version: "v1", auth });
}

export async function listGscSites(accessToken: string) {
  const client = getSearchConsoleClient(accessToken);
  const res = await client.sites.list();
  return res.data.siteEntry || [];
}

export async function getSearchAnalytics(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string
) {
  const client = getSearchConsoleClient(accessToken);

  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 25,
    },
  });

  return res.data.rows || [];
}

export async function getPerformanceOverview(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string
) {
  const client = getSearchConsoleClient(accessToken);

  const res = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["date"],
      rowLimit: 28,
    },
  });

  return res.data.rows || [];
}
