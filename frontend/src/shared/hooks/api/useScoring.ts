import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";

import {
  GetAllScoreLists,
  GetMyScore,
} from "@/shared/types/forAPI/ScoringType";

// /api/v1/score
// Get All Score

export const Score = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/score`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await res.json()) as GetAllScoreLists | AuthError | AuthValidateError;
};

// /api/v1/score/me
// Get My Score

export const Score_Me = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/score/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as GetMyScore | AuthError | AuthValidateError;
};
