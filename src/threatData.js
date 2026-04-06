// src/threatData.js
export const threatData = {
  nodes: [
    { id: "AI Model", type: "Asset", radius: 35, color: "#00f3ff", desc: "The core machine learning architecture (e.g., LLM, Neural Network).", mitigation: "Continuous monitoring and robust architecture design." },
    { id: "Training Data", type: "Asset", radius: 25, color: "#00f3ff", desc: "The raw datasets used to train and shape the AI.", mitigation: "Data provenance tracking and strict access controls." },
    { id: "API Endpoint", type: "Asset", radius: 25, color: "#00f3ff", desc: "The interface where users and other apps interact with the AI.", mitigation: "Rate limiting, authentication, and input validation." },
    { id: "Data Poisoning", type: "Attack", radius: 20, color: "#ff0055", desc: "Injecting malicious or biased data into the training set to compromise the model.", mitigation: "Data sanitization, anomaly detection, and human-in-the-loop review." },
    { id: "Model Inversion", type: "Attack", radius: 20, color: "#ff0055", desc: "Extracting sensitive training data by repeatedly querying the AI model.", mitigation: "Differential privacy and limiting API response detail." },
    { id: "Prompt Injection", type: "Attack", radius: 20, color: "#ff0055", desc: "Crafting malicious inputs to manipulate an LLM into bypassing its safety guardrails.", mitigation: "Strict input sanitization and fine-tuning against adversarial prompts." },
    { id: "State-Sponsored Hacker", type: "Actor", radius: 30, color: "#bc13fe", desc: "Highly resourced threat actors targeting AI for espionage or disruption." },
    { id: "Insider Threat", type: "Actor", radius: 30, color: "#bc13fe", desc: "Employees or contractors with authorized access acting maliciously or negligently." }
  ],
  links: [
    { source: "Training Data", target: "AI Model", value: 4 },
    { source: "API Endpoint", target: "AI Model", value: 4 },
    { source: "Data Poisoning", target: "Training Data", value: 2 },
    { source: "Model Inversion", target: "API Endpoint", value: 2 },
    { source: "Prompt Injection", target: "API Endpoint", value: 2 },
    { source: "State-Sponsored Hacker", target: "Data Poisoning", value: 1 },
    { source: "State-Sponsored Hacker", target: "Model Inversion", value: 1 },
    { source: "Insider Threat", target: "Data Poisoning", value: 1 },
    { source: "Insider Threat", target: "Prompt Injection", value: 1 }
  ]
};