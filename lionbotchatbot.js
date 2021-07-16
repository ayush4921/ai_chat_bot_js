var html_to_append = `
<div style="all:unset;">
<style scoped>
@import "https://fonts.googleapis.com/css?family=Noto+Sans";
* {
  box-sizing: border-box;
}
.floating-chat {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: fixed;
  bottom: 50px;
  left: 10px;
  width: 50px;
  height: 50px;
  transition: all 250ms ease-out;
  border-radius: 50%;
  opacity: 0;
  background: #5a5eb9;
  padding: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6),
    0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.floating-chat.enter {
  transform: translateY(0);
  opacity: 0.6;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.14);
}
.floating-chat.expand {
  width: 365px;
  max-height: 500px;
  height: 500px;
  border-radius: 5px;
  cursor: auto;
  opacity: 1;
  background: #efefef;
  box-shadow: 0px 5px 35px 9px #ccc;
}
@media only screen and (max-width: 768px) {
  .floating-chat.expand {
    width: 80%;
    max-height: 60%;
    height: 60%;
    border-radius: 5px;
    cursor: auto;
    opacity: 1;
    background: #efefef;
    box-shadow: 0px 5px 35px 9px #ccc;
  }
}
.floating-chat :focus {
  outline: 0;
  box-shadow: #5a5eb9;
}
.floating-chat button {
  background: transparent;
  border: 0;
  color: white;
  text-transform: uppercase;
  border-radius: 3px;
  cursor: pointer;
  padding:0;
  margin:0;
}
#stylebg {
  opacity: 1;
}
.floating-chat .chat {
  display: flex;
  flex-direction: column;
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  transition: all 250ms ease-out;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.floating-chat .chat.enter {
  opacity: 1;
  border-radius: 0;
  width: auto;
  height: auto;
}
.floating-chat .chat .header {
  flex-shrink: 0;
  padding-bottom: 10px;
  display: flex;
  background: transparent;
}
.floating-chat .chat .header .title {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 5px;
}
.floating-chat .chat .header button {
  flex-shrink: 0;
}
.floating-chat .chat .messages {
  padding: 10px;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 1;
  border-radius: 4px;
  background: transparent;
}
.floating-chat .chat .messages::-webkit-scrollbar {
  width: 5px;
}
.floating-chat .chat .messages::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #f5f5f5;
}
.floating-chat .chat .messages::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #f5f5f5;
}
.floating-chat .chat .messages li {
  position: relative;
  clear: both;
  display: inline-block;
  padding: 14px;
  margin: 0 0 20px 0;
  font: 12px/16px "Noto Sans", sans-serif;
  border-radius: 10px;
  word-wrap: break-word;
  max-width: 81%;
}
.floating-chat .chat .messages li:before {
  position: absolute;
  top: 0;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  content: "";
  background-size: cover;
}
.floating-chat .chat .messages li:after {
  position: absolute;
  top: 10px;
  content: "";
  width: 0;
  height: 0;
  border-top: 10px solid rgba(25, 147, 147, 0.2);
}
.floating-chat .chat .messages li.other {
  animation: show-chat-odd 0.15s 1 ease-in;
  -moz-animation: show-chat-odd 0.15s 1 ease-in;
  -webkit-animation: show-chat-odd 0.15s 1 ease-in;
  float: right;
  margin-right: 45px;
  background-color: white;
  color: black;
}
.floating-chat .chat .messages li.other:before {
  right: -45px;
  background-image: url(https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png);
}
.floating-chat .chat .messages li.other:after {
  right: -10px;
}
.floating-chat .chat .messages li.self {
  animation: show-chat-even 0.15s 1 ease-in;
  -moz-animation: show-chat-even 0.15s 1 ease-in;
  -webkit-animation: show-chat-even 0.15s 1 ease-in;
  float: left;
  margin-left: 45px;
  background-color: #5a5eb9;
  color: white;
}
.floating-chat .chat .messages li.self:before {
  left: -45px;
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjHasMpOu0s6QWpEvTNwdEwym4bz4lijL2Q&usqp=CAU);
}
.floating-chat .chat .messages li.self:after {
  left: -10px;
}
.floating-chat .chat .footer {
  flex-shrink: 0;
  display: flex;
  padding-top: 10px;
  max-height: 90px;
  background: transparent;
}
z @keyframes show-chat-even {
  0% {
    margin-left: -480px;
  }
  100% {
    margin-left: 0;
  }
}
@-moz-keyframes show-chat-even {
  0% {
    margin-left: -480px;
  }
  100% {
    margin-left: 0;
  }
}
@-webkit-keyframes show-chat-even {
  0% {
    margin-left: -480px;
  }
  100% {
    margin-left: 0;
  }
}
@keyframes show-chat-odd {
  0% {
    margin-right: -480px;
  }
  100% {
    margin-right: 0;
  }
}
@-moz-keyframes show-chat-odd {
  0% {
    margin-right: -480px;
  }
  100% {
    margin-right: 0;
  }
}
@-webkit-keyframes show-chat-odd {
  0% {
    margin-right: -480px;
  }
  100% {
    margin-right: 0;
  }
}
.chat-box-header {
  background: #5a5eb9;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  text-align: center;
  font-size: 20px;
  padding-top: 17px;
}
.material-icons{
  vertical-align: middle;
  line-height: 35px;
}
#chat-input {
  background: #f4f7f9;
  width: 100%;
  position: relative;
  height: 47px;
  padding-top: 10px;
  padding-right: 50px;
  padding-bottom: 10px;
  padding-left: 15px;
  border: none;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  color: #888;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
}
.chat-input > div {
  margin-bottom: 0;
}
#chat-input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #ccc;
}
#chat-input::-moz-placeholder {
  /* Firefox 19+ */
  color: #ccc;
}
#chat-input:-ms-input-placeholder {
  /* IE 10+ */
  color: #ccc;
}
#chat-input:-moz-placeholder {
  /* Firefox 18- */
  color: #ccc;
}
.chat-submit {
  position: absolute;
  bottom: 3px;
  right: 10px;
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: #5a5eb9;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.chat-box-toggle {
  float: right;
  margin-right: 15px;
  cursor: pointer;
}
</style>
<div class="floating-chat" >
    <i class="fa fa-comments" aria-hidden="true"></i>
    <div class="chat">
        <div class="chat-box-header">
            Ask LB Virtual Assistant
            <span class="chat-box-toggle"><button>
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>   </span>
          </div>
        <ul class="messages">
            <li class="self">Hi! How can I help you?</li>
        </ul>
        <div class="chat-input">      
            <div placeholder="Send a message..." class="text-box" contenteditable="true" disabled="true" id="chat-input" placeholder="Send a message..."></div>
            <button id="sendMessage" type="submit" class="chat-submit"><i class="material-icons" style="color: #5a5eb9;">send</i></button>
        </div>
        
    </div>
    </div>
</div>
`;

var styles_to_append = `
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/4.0.2/bootstrap-material-design.css'>
<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
`;

style_tab = document.getElementsByTagName("head")[0];

style_tab.insertAdjacentHTML("beforeend", styles_to_append);

body_tag = document.getElementsByTagName("body")[0];

body_tag.insertAdjacentHTML("beforeend", html_to_append);

var element = $(".floating-chat");
var myStorage = localStorage;

if (!myStorage.getItem("chatID")) {
  myStorage.setItem("chatID", createUUID());
}

setTimeout(function () {
  element.addClass("enter");
}, 1000);
var url =
  window.location != window.parent.location
    ? document.referrer
    : document.location.href;

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
  $("#__deeda__Button").style.display = "none";
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
  $("#__deeda__Button").style.display = "visible";
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
  if (newMessage == "q1" || newMessage == "Q1" || newMessage == "1") {
    send_message_for_question(messagesContainer, userInput, 0);

    return;
  }
  if (newMessage == "q2" || newMessage == "Q2" || newMessage == "2") {
    send_message_for_question(messagesContainer, userInput, 1);
    return;
  }
  window.final_response = getResponse(newMessage);
  if (window.final_response[0]["question"] != "hi there") {
    messagesContainer.append(
      [
        '<li class="self"> Q1) ',
        final_response[0]["question"],
        "<br>",
        "<br>",

        "Q2) ",
        final_response[1]["question"],
        "<br>",
        "</li>",
      ].join("")
    );
    clear_input(userInput, messagesContainer);
    messagesContainer.append(
      [
        '<li class="self" id="questionare"> <span id="answer1" onclick="return_answer(0)">Q1</span>&nbsp; &nbsp;<span id="answer2" onclick="return_answer(1)">Q2</span> </li>',
      ].join("")
    );
  } else {
    messagesContainer.append(
      ['<li class="self">', final_response[0]["response"], "</li>"].join("")
    );
  }
  clear_input(userInput, messagesContainer);
}

function send_message_for_question(messagesContainer, userInput, question) {
  messagesContainer.append(
    [
      '<li class="self">',
      window.final_response[question]["response"],
      "</li>",
    ].join("")
  );
  clear_input(userInput, messagesContainer);
  window.final_response = "";
}

function return_answer(question) {
  var userInput = $(".text-box");
  var messagesContainer = $(".messages");
  if (window.final_response != "") {
    messagesContainer.append(
      ['<li class="other">Q', question + 1, "</li>"].join("")
    );
    clear_input(userInput, messagesContainer);
    send_message_for_question(messagesContainer, userInput, question);
    document.getElementById("questionare").style.display = "none";
  }
}

function clear_input(userInput, messagesContainer) {
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

if (url == "https://www.lionsbefrienders.org.sg/") {
  openElement();
  element.find(".chat-box-header button").click(closeElement);
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
        'Visit <a target="_parent" href="https://www.lionsbefrienders.org.sg/volunteer-programmes/" style="color:white;">Link</a> to find out ',
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
        'Visit  <a target="_parent" href="https://www.lionsbefrienders.org.sg/contact-us/" style="color:white;">Link</a> to find the nearest centre to your place and dial in to the specific centre to enquire.',
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
        "adhoc",
        "ad-hoc volunteering",
        "volunteer ad-hoc",
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
        "collaborate",
        "mass event organisation",
        "mass event",
        "even organize with lion group",
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
        "donate",
        "how to donate",
        "donate to lionsbefrienders",
        "donate now",
      ],
      responses: [
        'Visit <a target="_parent" href="https://www.lionsbefrienders.org.sg/donate/" style="color:white;">Link</a> to support us.',
      ],
      context: [""],
    },
    {
      tag: "partner",
      patterns: [
        "I wish to partner LB on a CSR project. How do I go about that?",
        "partner on CSR project",
        "partner with LB on CSR project",
        "partner",
        "CSR",
        "CSR project partner",
        "I want to do CSR",
      ],
      responses: [
        'Visit <a target="_parent" href="https://www.lionsbefrienders.org.sg/partnerships/" style="color:white;">Link</a> for more info.',
      ],
      context: [""],
    },
    {
      tag: "help",
      patterns: ["I want to help", "how do I help?", "help how to", "help"],
      responses: ["Is there something that I can help you with?"],
      context: [""],
    },
    {
      tag: "work",
      patterns: [
        "I want to work at lion befrienders",
        "how do I work here?",
        "career at lion befrienders",
        "I want to work for you",
        "work at lion befrienders",
        "work now at LB",
        "work at now at lion befrienders",
        "career at LB",
        "careers",
      ],
      responses: [
        'Visit  <a target="_parent" href="https://www.lionsbefrienders.org.sg/careers/" style="color:white;">Link</a> for the available job opportunities.',
      ],
      context: [""],
    },
  ];

  const options = {
    includeScore: true,
    keys: ["patterns", "tag"],
  };

  const fuse = new Fuse(list_of_responses, options);
  const result = fuse.search(word);
  console.log(result);
  let dict_to_return = [
    {
      question: result[0]["item"]["patterns"][0],
      response: result[0]["item"]["responses"][0],
    },
    {
      question: result[1]["item"]["patterns"][0],
      response: result[1]["item"]["responses"][0],
    },
  ];
  return dict_to_return;
}
