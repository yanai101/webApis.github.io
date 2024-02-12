function speakText(e) {
  e.preventDefault();
  // Get the text from the text area
  const textArea = document.getElementById("message");
  const text = textArea.value;

  // Create a new SpeechSynthesisUtterance object
  const utterance = new SpeechSynthesisUtterance();

  // Set the text and language for the utterance
  utterance.text = text;
  utterance.lang = "he-IL"; // Hebrew language code

  utterance.pitch = document.getElementById("pitch").value;
  utterance.rate = document.getElementById("rate").value;

  // Use the speech synthesis API to play the text
  speechSynthesis.speak(utterance);
}

document.querySelector("#submit").addEventListener("click", speakText);

document.querySelector("#dadJoke").addEventListener("click", function () {
  const jocks = [
    `
  מה אמר אלקטרון לאלקטרון אחר?
      נפגשים בקוטב החיובי!`,

    `מה משותף לגלידה ונייר טואלט?
            קינוח `,

    ` אמא: הילד אוכל את הטלפון ... אולי תעשה משהו
          אבא: זה בסדר, זה טלפון כשר`,

    `איזה תא בגוף האדם הוא קוסם? תא דם`,

    `יש לי המון בדיחות על אבטלה, אבל אף אחת מהן לא עובדת.`,
  ];

  const randomIndex = Math.floor(Math.random() * jocks.length);
  const randomJoke = jocks[randomIndex];
  document.getElementById("message").value = randomJoke;
  speakText();
});
