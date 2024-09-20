var shotInfo = {
  "basic": [
    {
      "tint": "grey",
      "desc": "Slightly too hard.",
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "gold",
      "desc": "As shown.",
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "red",
      "desc": [
        "Slightly too hard.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "gold",
      "desc": "As shown (very slightly too soft).",
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "red",
      "desc": [
        "Black section halfway over line?",
        "Barely too hard."
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "white",
      "desc": [
        "Add backspin to avoid double-kissing.",
        "Too soft."
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "cyan",
      "desc": [
        "Too soft.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "gold",
      "desc": "",
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "gold",
      "desc": "",
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "white",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "red",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "white",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "red",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "grey",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "grey",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    }
  ],
  "chain": [
    {
      "tint": "red",
      "desc": [
        "Too soft.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "grey",
      "desc": [
        "Far too hard, probably intended for force 1.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "cyan",
      "desc": [
        "Slightly too soft.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "gold",
      "desc": [
        "Hit between shown and 1/4 power.",
        "Shown power almost too hard."
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "cyan",
      "desc": [
        "Too hard.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "grey",
      "desc": [
        "Too hard (bounces).",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "cyan",
      "desc": [
        "Too soft, cut too far.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "cyan",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "gold",
      "desc": "",
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "grey",
      "desc": [
        "Too soft, bad angle.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "red",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "grey",
      "desc": [
        "Cut far too much.",
        "Red barely hits gold."
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "grey",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    },
    {
      "tint": "gold",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": [],
      "red": []
    }
  ],
  "rebound": [
    {
      "tint": "gold",
      "desc": [
        "Aim with high aim level queue to line up, align battered cue to blue/white border on table cushion.",
        "Almost too soft, aim for 1/3rd of black segment below line."
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "cyan",
      "desc": [
        "On target, too hard.",
        "End result of A.",
        "Off target, too soft.",
        "End result of C."
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "grey",
      "desc": [
        "On target, far too hard.",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "grey",
      "desc": [
        "On target, do not adjust aim.",
        "Far too hard."
      ],
      "target": [],
      "cue": [],
      "gold": []
    },
    {
      "tint": "gold",
      "desc": [
        "",
        ""
      ],
      "target": [],
      "cue": [],
      "gold": []
    }
  ]
};

function iterateShots(data, type) {
  data.forEach((shot, i) => {
    var name = type + " " + (i+1);
    var shotHtml = buildShot(shot, name);
    console.log(shotHtml);

    var shotObj = document.createElement("div");
    shotObj.id = name;
    shotObj.innerHTML = shotHtml[0];
    shotObj.style.display = "none";
    document.getElementById("shots").appendChild(shotObj);

    var shotToggle = document.createElement("button");
    shotToggle.innerHTML = "<h4>" + name + "</h4>" + shotHtml[1];
    shotToggle.type = "button";
    shotToggle.onclick = function() { toggleVisible(shotObj) };
    shotToggle.style = "width: 10%; background: " + shot.tint;
    document.getElementById("toggles").appendChild(shotToggle);
  });
}

function buildShot(data, name) {
  var images = [];
  if (typeof data.desc == "string") {
    images.push([name, data.desc]);
  }
  else data.desc.forEach((str, i) => {
    images.push([name + String.fromCharCode(65 + i), String.fromCharCode(65 + i) + ": " + str]);
  });
  var resp = "<h3>" + name + "</h3><div style='display: flex; flex-wrap: wrap'>";
  var firstImg = "<img src='./" + images[0][0] + ".png' width=100% />";
  images.forEach(img => {
    resp += "<div style='flex-basis:50%; margin-top: 20px'><img src='./" + img[0] + ".png' width=100% /><br/>";
    resp += "<span style='margin-left: 40px'>" + img[1] + "</span></div>";
  });
  return [resp + "</div>", firstImg];
}

var curVisible = null;
function toggleVisible(div) {
  if (curVisible != null) curVisible.style.display = "none";
  curVisible = div;
  div.style.display = null;
}

window.onload = function () {
  var toggles = document.getElementById("toggles");
  iterateShots(shotInfo.basic, "Basic");
  var br = document.createElement("br");
  toggles.appendChild(br);
  iterateShots(shotInfo.chain, "Chain");
  br = document.createElement("br");
  toggles.appendChild(br);
  iterateShots(shotInfo.rebound, "Rebound");
}
