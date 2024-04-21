#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
//Heading.
console.log(chalk.blueBright.bold("\t WELCOME TO THE CURRENCY CONVERTOR WITH RABI KHAN \t\n"));

// Currency Converter API LINK.
let apiLink = 
  "https://v6.exchangerate-api.com/v6/c16f401ce70c9ebe6dd98b5b/latest/PKR";
   
  // Fetching Data from the API.
  let fetchData = async (data:any) => {
      let fetchData = await fetch(data);
      let res = await fetchData.json();
      return res.conversion_rates;
  };

  let data = await fetchData(apiLink);
  // conversion of object to array.
  let countries = Object.keys(data);

  // user input of first country.
  let firstCountry = await inquirer.prompt({
    type: "list",
    name: "c1name",
    message: "Converting From",
    choices: countries,
  });

  // user input of money.
  let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupees",
    message: `please enter the amount in ${chalk.greenBright.bold(
        firstCountry.c1name
        )}:`    
  });

  // converted country.
  let secondCountry = await inquirer.prompt({
    type: "list",
    name: "c2name",
    message: "Converting To",
    choices: countries,
  });

  // conversion rate.
  let cnv = 
    `https://v6.exchangerate-api.com/v6/c16f401ce70c9ebe6dd98b5b/pair/${firstCountry.c1name}/${secondCountry.c2name}`;

    // fetching data for conversion rate.
    let cnvData = async (data:any) => {
        let cnvData = await fetch(data);
        let res = await cnvData.json();
        return res.conversion_rate;
    };

    let conversionRate = await cnvData(cnv);

    let convertedRate = userMoney.rupees * conversionRate

    console.log(`your ${chalk.bold.greenBright(firstCountry.c1name)} ${chalk.bold.greenBright(userMoney.rupees)} in ${chalk.bold.greenBright(secondCountry.c2name)} is ${chalk.bold.greenBright(convertedRate)}`
    );

    console.log(chalk.bold.bgMagenta(`THANK YOU FOR USING THE APP!! HAVE A GOOD DAY SEE YOU NEXT TIME!!!`));