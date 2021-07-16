var element = $(".floating-chat");
var myStorage = localStorage;

if (!myStorage.getItem("chatID")) {
  myStorage.setItem("chatID", createUUID());
}

setTimeout(function () {
  element.addClass("enter");
}, 1000);
$(document).ready(openElement);
element.click(openElement);

function openElement() {
  var messages = element.find(".messages");
  var textInput = element.find(".text-box");
  element.find(">i").hide();
  element.addClass("expand");
  element.find(".chat").addClass("enter");
  var strLength = textInput.val().length * 2;
  textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
  element.off("click", openElement);
  element.find(".chat-box-header button").click(closeElement);
  element.find("#sendMessage").click(sendNewMessage);
  messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
  element.find(".chat").removeClass("enter").hide();
  element.find(">i").show();
  element.removeClass("expand");
  element.find(".header button").off("click", closeElement);
  element.find("#sendMessage").off("click", sendNewMessage);
  element
    .find(".text-box")
    .off("keydown", onMetaAndEnter)
    .prop("disabled", true)
    .blur();
  setTimeout(function () {
    element.find(".chat").removeClass("enter").show();
    element.click(openElement);
  }, 500);
}

function createUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function sendNewMessage() {
  var userInput = $(".text-box");
  var newMessage = userInput
    .html()
    .replace(/\<div\>|\<br.*?\>/gi, "\n")
    .replace(/\<\/div\>/g, "")
    .trim()
    .replace(/\n/g, "<br>");
  var messagesContainer = $(".messages");
  messagesContainer.append(
    ['<li class="other">', newMessage, "</li>"].join("")
  );

  if (!newMessage) return;

  let final_response = getResponse(newMessage);
  console.log(final_response);
  messagesContainer.append(
    ['<li class="self">', final_response, "</li>"].join("")
  );

  // clean out old message
  userInput.html("");
  // focus on input
  userInput.focus();

  messagesContainer.finish().animate(
    {
      scrollTop: messagesContainer.prop("scrollHeight"),
    },
    250
  );
}

function onMetaAndEnter(event) {
  if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
    sendNewMessage();
  }
}

function getResponse(word) {
  list_of_responses = [
    {
      tag: "greetings",
      patterns: [
        "hi there",
        "hello",
        "haroo",
        "yaw",
        "wassup",
        "hi",
        "hey",
        "holla",
        "hello",
      ],
      responses: [
        "Hello thanks for checking in",
        "hi there, how can i help you",
      ],
      context: [""],
    },
    {
      tag: "volunteer",
      patterns: [
        "How do I become a volunteer?",
        "how to volunteer",
        "volunteer",
        "how I volunteer",
        "become a volunteer",
        "volunteering how to",
      ],
      responses: [
        "Visit https://www.lionsbefrienders.org.sg/volunteer-programmes/ to find out ",
      ],
      context: [""],
    },
    {
      tag: "refer",
      patterns: [
        "How do I refer a senior?",
        "senior refer",
        "refer",
        "referral",
        "refer a senior",
        "how to refer",
      ],
      responses: [
        "Since 3 May 2021, MOH launched a new Elder Care model, where all befriending referrals have been centralized and now need to be referred via the IRMS system. Hence, LB no longer take in direct referrals and only receive referrals via the system. If you don’t have an IRMS account, you may sign up at https://app.aic.sg/eReg/.",
      ],
      context: [""],
    },
    {
      tag: "Senior Activity Centre",
      patterns: [
        "How can I join your Senior Activity Centre?",
        "senior Activity center",
        "join senior activity center",
        "senior activity",
        "senior activity center joining",
      ],
      responses: [
        "Visit https://www.lionsbefrienders.org.sg/contact-us/ to find the nearest centre to your place and dial in to the specific centre to enquire.",
      ],
      context: [""],
    },
    {
      tag: "Miscellineous",
      patterns: ["How can I meet the team", "meet the team", "How I meet team"],
      responses: ["Meeting the team is currently not supported"],
      context: [""],
    },
    {
      tag: "ad-hoc volunteering",
      patterns: [
        "how to do ad-hoc volunteering",
        "how I give daily necessities to seniors.",
        "volunteering give out to seniors",
      ],
      responses: [
        "Please send your message enquiry to volunteering@lb.org.sg.",
      ],
      context: [""],
    },
    {
      tag: "mass event",
      patterns: [
        "how do I collaborate with LB on a mass event",
        "My company wish to collaborate with LB on a mass event",
        "want to collaborate on mass event",
      ],
      responses: ["Please send your message enquiry to event@lb.org.sg."],
      context: [""],
    },
    {
      tag: "donate",
      patterns: [
        "how do I donate to LB",
        "donate to lion befrienders",
        "How can I donate?",
      ],
      responses: [
        "Visit https://www.lionsbefrienders.org.sg/donate/ to support us. ",
      ],
      context: [""],
    },
    {
      tag: "partner",
      patterns: [
        "I wish to partner LB on a CSR project. How do I go about that?",
        "partner on CSR project",
        "partner with LB on CSR project",
      ],
      responses: [
        "Visit https://www.lionsbefrienders.org.sg/partnerships/ for more info.",
      ],
      context: [""],
    },
    {
      tag: "help",
      patterns: ["I want to help", "how do I help?", "help how to"],
      responses: ["Is there something that I can help you with?"],
      context: [""],
    },
  ];

  const options = {
    includeScore: true,
    keys: ["patterns", "tag"],
  };

  const fuse = new Fuse(list_of_responses, options);
  const result = fuse.search(word);
  let final_response_to_return = result[0]["item"]["responses"][0];
  if (final_response_to_return && result[0]["score"] < 0.1) {
    //pass
  } else {
    final_response_to_return = "Sorry.. Can you please rephrase the question?";
  }
  return final_response_to_return;
}
