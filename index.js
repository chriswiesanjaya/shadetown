/*
-- CODE REFACTORING
1. Template Literals - `Hello ${name}!`
2. Destructuring Objects - let {name, age} = myObject
3. Spread Operator - let newObject = {...newObject}
4. Arrow Functions - let myFunction = (a, b) => {a * b};
5. Default Parameters - function myFunction(a = 1, b = 2) {}
6. Let & Const
7. Filter Method - array.filter(function)
8. Import & Export
--
*/

import { sunglassesOptions, sunglasses } from "./sunglasses.js";

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName(
    "product-image_lenses"
)[0];

let sunglassesNew = "";

const setSunglasses = (sunglassesNew = sunglasses) => {
    sunglassesNew;
};

// Render function
const render = (sunglassesNew = sunglasses) => {
    const { model, lenses, frame } = sunglassesNew;

    const price = `$${model.price + lenses.price + frame.price}`;

    productDetailsEl.innerHTML = `<h1>${model.name}</h1>
    <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
    <p>${price}</p>`;

    const currClass = productImage.classList[1];
    productImage.classList.replace(currClass, model.cssClass);

    const currFramesClass = productFrames.classList[1];
    productFrames.classList.replace(currFramesClass, frame.cssClass);

    const currLensesClass = productLenses.classList[1];
    productLenses.classList.replace(currLensesClass, lenses.cssClass);
};

// Highlight current selection
const addHighlight = (clickedItem) => {
    // Remove "selected" class from ALL product-thumb
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb")).forEach(
            (thumb) => {
                thumb.classList.remove("selected");
            }
        );
    }

    // Remove "selected" class from ALL product-color-swatch
    else if (clickedItem.classList.contains("product-color-swatch")) {
        const siblings = clickedItem.closest("ul").querySelectorAll("button");
        Array.from(siblings).forEach((swatch) => {
            swatch.classList.remove("selected");
        });
    }

    // Add "selected" class to the clicked item
    clickedItem.classList.add("selected");
};

document.body.addEventListener("click", (event) => {
    const clickedItem = event.target;

    if (!sunglassesNew) {
        sunglassesNew = sunglasses;
    }

    // Update Model
    if (clickedItem.classList.contains("product-thumb")) {
        const currName = clickedItem.dataset.name;

        const modelOptions = sunglassesOptions.models.filter((item) => {
            return item.name === currName;
        })[0];

        const name = modelOptions.name;
        const price = modelOptions.price;
        const thumbImg = modelOptions.thumbImg;
        const cssClass = modelOptions.cssClass;

        sunglassesNew = {
            model: {
                name: name,
                price: price,
                thumbImg: thumbImg,
                cssClass: cssClass,
            },
            lenses: { ...sunglassesNew.lenses },
            frame: { ...sunglassesNew.frame },
        };

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
    }

    // Update colors for lenses / frames
    if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color;

        // Check nearest parent div (lenses)
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            const colorOptions = sunglassesOptions.lenses.filter((item) => {
                return item.color === currColor;
            })[0];

            const color = colorOptions.color;
            const price = colorOptions.price;
            const cssClass = colorOptions.cssClass;

            sunglassesNew = {
                model: { ...sunglassesNew.model },
                lenses: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
                frame: { ...sunglassesNew.frame },
            };
        }

        // Frames
        else {
            const colorOptions = sunglassesOptions.frames.filter((item) => {
                return item.color === currColor;
            })[0];

            const color = colorOptions.color;
            const price = colorOptions.price;
            const cssClass = colorOptions.cssClass;

            sunglassesNew = {
                model: { ...sunglassesNew.model },
                lenses: { ...sunglassesNew.lenses },
                frame: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
            };
        }

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
    }
});

render(sunglasses);
