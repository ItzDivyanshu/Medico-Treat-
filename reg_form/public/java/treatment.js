var areapartinfo = [
  {
    area: "Head",
    parts: [
      "Skull",
      "Eyes",
      "Nose",
      "Mouth",
      "Ear",
      "Teeth",
      "Tongue",
      "Jaw",
      "Scalp",
      "Hair",
    ],
  },
  {
    area: "Neck",
    parts: ["Throat", "Adam's Apple"],
  },
  {
    area: "Shoulder Chest",
    parts: ["Heart", "Lung", "Ribcage"],
  },
  {
    area: "Abdomen",
    parts: [
      "Stomach",
      // "Liver",
      // "Gallbladder",
      // "Pancreas",
      // "Intestines",
      // "Kidneys",
      // "Bladder",
    ],
  },
  {
    area: "Back",
    parts: ["Spine", "Muscles"],
  },
  {
    area: "Arms",
    parts: ["Shoulders", "Upper arm", "Elbow", "Forearm", "Wrist", "Hand"],
  },
  {
    area: "Pelvis",
    parts: ["Hips", "Buttocks"],
  },
  {
    area: "Legs",
    parts: ["Thigh", "Knee", "Calf", "Ankle", "Foot"],
  },
];

var cutdetails = {
  "Cut by metal object": "",
  "Non-metallic Cut or Wound": "",
  "Size of cut or wound (small)": "",
  "Size of cut or wound (medium)": "",
  "Size of cut or wound (large)": "",
};

var bruisesdetails = {
  "Pain (mild)": "",
  "Pain (moderate)": "",
  "Pain (severe)": "",
};

var spraindetails = {
  "Pain (mild)": "",
  "Pain (moderate)": "",
  "Pain (severe)": "",
};

var fracturedetails = {
  "Swelling": "",
  "Bruising": "",
};

var itchingdetails = {
  "Mild": "",
  "Moderate": "",
  "Severe": "",
};

var dislocationdetails = {
  "Pain (mild)": "",
  "Pain (moderate)": "",
  "Pain (severe)": "",
  "Discoloration": "",
};

var firedetails = {
  "Pain (mild)": "",
  "Pain (moderate)": "",
  "Pain (severe)": "",
  "Blistering": "",
  "Charred Skin": "",
  "Size (small)": "",
  "Size (medium)": "",
  "Size (large)": "",
};

var swellingdetails = {
  "Severity (mild)": "",
  "Severity (moderate)": "",
  "Severity (severe)": "",
};

var ristricteddetails = {
  "Severity (mild)": "",
  "Severity (moderate)": "",
  "Severity (severe)": "",
  "Swelling": "",
  "Stiffness": "",
  "Pain": "",
};

var problemspecify = {
  "Cuts and Wounds": {
    "Bleeding": cutdetails,
    "Not Bleeding": cutdetails,
    "Partially Bleeding": cutdetails,
    "Bleeding and burning sensation": cutdetails,
    "Only Cut": cutdetails,
    "Accidently wound": cutdetails,
  },
  "Bruises": {
    "Tender to touch": bruisesdetails,
    "Small in size": bruisesdetails,
    "Medium in size": bruisesdetails,
    "Large in size": bruisesdetails,
  },

  "Sprain and Strain": {
    "Bruising Presemt": spraindetails,
    "Swelling Presemt": spraindetails,
    "Ristrict the movement": spraindetails,
  },

  "Fracture": {
    "Deformity is visible": fracturedetails,
  },

  "Itching": {
    "Bumps": itchingdetails,
    "Blisters": itchingdetails,
    "Lesions": itchingdetails,
  },

  "Dislocation": {
    "Complete Dislocation": dislocationdetails,
    "Partial Dislocation": dislocationdetails,
  },

  "Fire Injury": {
    "1st Degree": firedetails,
    "1st Degree": firedetails,
    "1st Degree": firedetails,
  },

  "Swelling": {
    "Redness": swellingdetails,
    "Warmth": swellingdetails,
  },

  "Ristricterd Range of Motion": ristricteddetails,
};

window.onload = function () {
  const selectproblem = document.getElementById("problem"),
    selectspecify = document.getElementById("specify"),
    selectadditional = document.getElementById("additional"),
    selects = document.querySelectorAll("select");

  selectspecify.disabled = true;
  selectadditional.disabled = true;

  selects.forEach((select) => {
    if (select.disabled == true) {
      select.style.cursor = "auto";
    } else {
      select.style.cursor = "pointer";
    }
  });

  for (let problem in problemspecify) {
    selectproblem.options[selectproblem.options.length] = new Option(
      problem,
      problem
    );
  }

  // problem change
  selectproblem.onchange = (e) => {
    selectspecify.disabled = false;
    selectadditional.disabled = true;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    selectspecify.length = 1;
    selectadditional.length = 1;

    for (let specify in problemspecify[e.target.value]) {
      selectspecify.options[selectspecify.options.length] = new Option(
        specify,
        specify
      );
    }
  };

  // specify change
  selectspecify.onchange = (e) => {
    selectadditional.disabled = false;

    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });

    selectadditional.length = 1;
    for (let additional in problemspecify[selectproblem.value][
      e.target.value
    ]) {
      selectadditional.options[selectadditional.options.length] = new Option(
        additional,
        additional
      );
    }
  };

  // change additional
  selectadditional.onchange = (e) => {
    selects.forEach((select) => {
      if (select.disabled == true) {
        select.style.cursor = "auto";
      } else {
        select.style.cursor = "pointer";
      }
    });
  };

  // Populating the area and part select boxes
  const selectarea = document.getElementById("area");
  const selectpart = document.getElementById("part");

  selectpart.disabled = true;

  areapartinfo.forEach((area) => {
    selectarea.options[selectarea.options.length] = new Option(
      area.area,
      area.area
    );
  });

  selectarea.onchange = (e) => {
    selectpart.disabled = false;

    selectpart.length = 1;

    const selectedArea = areapartinfo.find((area) => area.area === e.target.value);
    if (selectedArea) {
      selectedArea.parts.forEach((part) => {
        selectpart.options[selectpart.options.length] = new Option(part, part);
      });
    }
  };

  // Event listener for the submit button
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const formData = {
      ambulance_service: document.querySelector('input[name="ambulance_service"]:checked').value,
      fname: document.getElementById("fname").value,
      age: document.getElementById("age").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      area: document.getElementById("area").value,
      part: document.getElementById("part").value,
      problem: document.getElementById("problem").value,
      specify: document.getElementById("specify").value,
      additional: document.getElementById("additional").value,
    };

    fetch('/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Redirect or show a success message
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
};
