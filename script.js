const rangevalue = document.querySelector(".slider-container .price-slider");
const rangeInputvalue = document.querySelector(".range-input input");

//set the price gap
let priceGap = 500;

//Adding event listeners to price input elements
const priceInputvalue = document.querySelectorAll(".price-input input");
for (let i = 0; i < priceInputvalue.length; i++) {
  priceInputvalue[i].addEventListener("input", (e) => {
    //Parse min and max values of the range input
    let minp = parseInt(priceInputvalue[0].value);
    let maxp = parseInt(priceInputvalue[1].value);
    let diff = maxp - minp;

    if (minp < 0) {
      alert("minimum price cannot be less than 0");
      priceInputvalue[0].value = 0;
      minp = 0;
    }
    if (maxp > 10000) {
      alert("max price cannot be greater than 10000");
      priceInputvalue[1].value = 10000;
      maxp = 10000;
    }
    if (minp > maxp - priceGap) {
      priceInputvalue[0].value = maxp - priceGap;
      minp = maxp - priceGap;

      if (minp < 0) {
        priceInputvalue[0].value = 0;
        minp = 0;
      }
    }
    //check if the price gap is met
    //max price is within the range
    if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
      if (e.target.className === "min-input") {
        rangeInputvalue[0].value = minp;
        let value1 = rangeInputvalue[0].max;
        rangevalue.style.left = `${(minp / value1) * 100}%`;
      } else {
        rangeInputvalue[1].value = maxp;
        let value2 = rangeInputvalue[1].max;
        rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
      }
    }
    //Add event listeners to range input elements
    for (let i = 0; i < rangeInputvalue.length; i++) {
      rangeInputvalue[i].addEventListener("input", (e) => {
        let minVal = parseInt(rangeInputvalue[0].value);
        let maxVal = parseInt(rangeInputvalue[1].value);

        let diff = maxVal - minVal;

        //check if the price gap is exceeded
        if (diff < priceGap) {
          //check if the input is the min range input
          if (e.target.className === "min-range") {
            rangeInputvalue[0].value = maxVal - priceGap;
          } else {
            rangeInputvalue[1].value = minVal + priceGap;
          }
        } else {
          //update price inputs and range progress
          priceInputvalue[0].value = minVal;
          priceInputvalue[1].value = maxVal;
          rangevalue.style.left = `${(minVal / rangeInputvalue[0].max) * 100}%`;
          rangevalue.style.right = `${
            100 - (maxVal / rangeInputvalue[1].max) * 100
          }%`;
        }
      });
    }
  });
}
