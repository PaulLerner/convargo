'use strict';
//constant declarations
//for exercice 2
		const decrease5m3=0.1;
		const decrease10m3=0.3;
		const decrease25m3=0.5;

//for exercice 3
const comPercentage=0.3;
		const insPercentage=0.5;
		const treasuryFee=1;
		const treasuryRange=500;
//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
	'treasury':0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//exercice 1
function GetTrucker(truckerId)
{
	for(var j =0; j < truckers.length;j++)
			{
				
				if(truckerId==truckers[j].id)
					{
						return truckers[j];
					}
			}
	return {};
}
for(var i =0;i<deliveries.length;i++)
	{
		var trucker = GetTrucker(deliveries[i].truckerId);
		deliveries[i].price+= deliveries[i].distance*trucker.pricePerKm+deliveries[i].volume*trucker.pricePerVolume;
					
	}

//exercice 2
/***price per m3**

* decreases by **10% after 5 m3**
* decreases by **30% after 10 m3**
* decreases by **50% after 25 m3***/
for(var i =0;i<deliveries.length;i++)
	{
		if(deliveries[i].volume<=5)
			{
				//no decrease
			}
		else if (deliveries[i].volume<=10)//between 5 and 10
			{
				deliveries[i].price*=decrease5m3;
			}
		else if (deliveries[i].volume<=25)//between 10 and 25
			{
				deliveries[i].price*=decrease10m3;
			}
		else//more than 25
			{
				deliveries[i].price*=decrease25m3;
			}
					
	}
//exercice 3
/*Convargo take a 30% commission on the shipping price to cover their costs.

#### Commission

The commission is split like this:

* **insurance**: half of commission
* **the Treasury**: 1€ by 500km range
* **convargo**: the rest*/
for(var i =0;i<deliveries.length;i++)
	{
		
		var commission = deliveries[i].price*comPercentage;
		
		deliveries[i].commission.insurance=commission*insPercentage;
		commission-=deliveries[i].commission.insurance;
		
		deliveries[i].commission.treasury= Math.ceil(deliveries[i].distance/treasuryRange)*treasuryFee;
		commission-=deliveries[i].commission.treasury;
		
		deliveries[i].commission.convargo+=commission;
	}

//exercice 4
/*In case of an accident/theft, convargo applies a 1000€ deductible.

The shipper can reduce the deductible amount from 1000€ to 200€ with a `deductible option` for a few more euros per volume.

#### The deductible

The driver is charged an additional 1€/m3 when he chooses the `deductible reduction` option.

**The additional charge goes to convargo, not to the trucker.**

#### Just tell me what to do

Compute the new amount price if the shipper subscribed to `deductible option`.*/
for(var i =0;i<deliveries.length;i++)
	{
		if(deliveries[i].options.deductibleReduction)
			{
				deliveries[i].price+=deliveries[i].volume*1;
			}
	}

//exercice 5
/*
- **the shipper** must pay the **shipping price** and the **(optional) deductible reduction**
- **the trucker** receives the **shipping price** minus the **commission**
- **the insurance** receives its part of the **commission**
- **the Treasury** receives its part of the tax **commission**
- **convargo receives** its part of the **commission**, plus the **deductible reduction***/
/*
function GetDelivery(deliveryId)
{
	for(var i=0; i < deliveries.length;i++)
		{
			if(deliveries[i].id==deliveryId)
				{
					
				return deliveries[i];
				}
		}
	return {};
}
for(var i=0; i< actors.length;i++)
	{
		var delivery = GetDelivery(actors[i].deliveryId);
		actors[i].payment
	}
*/
console.log("Truckers :");
console.log(truckers);
console.log("Deliveries :");
console.log(deliveries);

console.log("Actors :");
console.log(actors);
