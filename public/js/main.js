function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";
  document.querySelector("#resText").innerHTML = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size")
    ? document.querySelector("#size").value
    : "small";
  const type = document.querySelector("#type").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  if (type === "talk") {
    getTalkRequest(prompt);
  } else if (type === "image") {
    generateImageRequest(prompt, size);
  }
}
async function getTalkRequest(prompt) {
  try {
    showSpinner();
    const response = await fetch("/openai/generateTalk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That talk could not be generated");
    }

    const data = await response.json();
    console.log(data);
    const text = data.data;

    document.querySelector("#resText").innerHTML = text;
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
