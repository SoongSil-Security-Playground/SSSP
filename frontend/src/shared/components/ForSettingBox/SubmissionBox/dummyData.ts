export interface Submission {
  id: number;
  userName: string;
  challengeName: string;
  submitTime: string;
  solvedAt: string;
  correct: boolean;
}

export const dummySubmissions: Submission[] = [
  {
    id: 1,
    userName: "ofla",
    challengeName: "Buffer Overflow 101",
    submitTime: "2025-06-18 14:23:05",
    solvedAt: "2025-06-18 14:25:12",
    correct: true,
  },
  {
    id: 2,
    userName: "mhibio",
    challengeName: "SQLi Basics",
    submitTime: "2025-06-18 15:02:47",
    solvedAt: "2025-06-18 15:05:30",
    correct: false,
  },
  {
    id: 3,
    userName: "mlnls",
    challengeName: "XSS Demo",
    submitTime: "2025-06-18 16:12:10",
    solvedAt: "2025-06-18 16:14:55",
    correct: true,
  },
  {
    id: 4,
    userName: "soso",
    challengeName: "CSRF Attack",
    submitTime: "2025-06-18 17:45:33",
    solvedAt: "2025-06-18 17:48:02",
    correct: true,
  },
  {
    id: 5,
    userName: "oxdjww",
    challengeName: "Crypto 50",
    submitTime: "2025-06-18 18:30:21",
    solvedAt: "2025-06-18 18:33:10",
    correct: false,
  },
  {
    id: 6,
    userName: "GLICO",
    challengeName: "Forensics: Stego",
    submitTime: "2025-06-18 19:05:47",
    solvedAt: "2025-06-18 19:08:15",
    correct: true,
  },
  {
    id: 7,
    userName: "mhdev",
    challengeName: "Reversing: CrackMe",
    submitTime: "2025-06-18 20:18:09",
    solvedAt: "2025-06-18 20:20:45",
    correct: true,
  },
  {
    id: 8,
    userName: "tester",
    challengeName: "Misc: Trivia",
    submitTime: "2025-06-18 21:02:55",
    solvedAt: "2025-06-18 21:05:12",
    correct: false,
  },
];
