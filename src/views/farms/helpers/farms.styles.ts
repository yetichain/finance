// Bg changer for farm cards
export const farmCardsBg = {
  0: `
  	background: url(/images/farms/cards/farm_card_default.png), linear-gradient(180deg, #6c5dd3 0%, #8677f0 100%);
	`,
  1: `
	background: url(/images/farms/cards/farm_card_1.png), linear-gradient(180deg, #4334a6 -3.7%, #8677f0 103.7%);
	`,
  2: `
  background: url(/images/farms/cards/farm_card_2.png), linear-gradient(180deg, #4334a6 0%, #9e00ff 100%); 
  `,
  3: `
  background: url(/images/farms/cards/farm_card_3.png), linear-gradient(180deg, #4334a6 0%, #2468ee 100%); 
  `,
}

export const farmBgForNthChild = (nthChild: number, bgNum?: number) => {
  return `
	&:nth-child(${nthChild}) {
		.farm__head {
		  ${farmCardsBg[bgNum || nthChild]}
		}
	  }
	`
}
