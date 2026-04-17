# 🧠 Project Notes – Flag Game

This file contains research, ideas, and technical notes used during development.

---

Primary User:

Students (ages 12–20)
Casual gamers
People interested in geography

## 🌍 APIs Used

### 1. REST Countries API
- URL: https://restcountries.com/
- Used for:
  - Country names
  - Flags
  - Region data

Example:
https://restcountries.com/v3.1/name/canada

---

### 2. Open-Meteo API for weather (optional feature)
- URL: https://api.open-meteo.com/
- Used for:
  - Live weather data based on user location

Example:
https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.4&current_weather=true

---

## ⚙️ Game Logic Notes

- Each question:
  - 1 correct answer
  - 3 random incorrect answers
- Total options = 4

⚠️ Important:
- Must have at least 4 countries per continent
- Otherwise game may freeze (fixed with validation)

---

## 🧩 Known Issues & Fixes

### Issue: Game freezes on small continents
- Cause: Not enough country options
- Fix:
```js
if (countryData.length < 4) return;