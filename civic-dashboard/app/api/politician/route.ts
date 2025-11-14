import { NextResponse } from "next/server";

export async function GET() {
  const sample = {
    name: "Jordan Reyes",
    party: "Independent",
    district: "CA-12",
    attendance: 94,
    votesWithParty: 88,
    topDonorSectors: ["Finance", "Real Estate", "Technology"]
  };

  return NextResponse.json(sample);
}
