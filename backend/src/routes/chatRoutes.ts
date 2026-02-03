import { Router } from "express";
import { availabilityDates, locations, sessionProfile } from "../data/mockData";

const router = Router();

router.post("/chat", (req, res) => {
  const message = (req.body?.message as string) || "";
  res.json({
    type: "text",
    message: message
      ? "Thanks for the message. I can guide you to bookings, locations, and recommendations."
      : "How can I help today?"
  });
});

router.get("/session/:id", (req, res) => {
  res.json(sessionProfile);
});

router.get("/locations", (req, res) => {
  res.json({ locations });
});

router.get("/availability", (req, res) => {
  res.json({ dates: availabilityDates });
});

export default router;
