export default class Helpers {
    static validatePopulationData(geoJsonData, populationData) {
        geoJsonData.forEach((g) => {
            const countryName = g.properties.name;
            const populationDataElement = populationData
                .find((e => e.country === countryName));
            if (!populationDataElement) {
                console.error(`Country ${countryName} was not found in population data`);
            }
        });
    }
    // https://github.com/HubSpot/humanize/blob/master/src/humanize.js
    static compactInteger(input, decimals = 0) {
        decimals = Math.max(decimals, 0);
        const number = parseInt(input, 10);
        const signString = number < 0 ? '-' : '';
        const unsignedNumber = Math.abs(number);
        const unsignedNumberString = String(unsignedNumber);
        const numberLength = unsignedNumberString.length;
        const numberLengths = [13, 10, 7, 4];
        const bigNumPrefixes = ['T', 'B', 'M', 'k'];

        // small numbers
        if (unsignedNumber < 1000) {
            return `${signString}${unsignedNumberString}`;
        }

        // really big numbers
        if (numberLength > numberLengths[0] + 3) {
            return number.toExponential(decimals).replace('e+', 'x10^');
        }

        // 999 < unsignedNumber < 999,999,999,999,999
        let length;
        for (let i = 0; i < numberLengths.length; i++) {
            const _length = numberLengths[i];
            if (numberLength >= _length) {
                length = _length;
                break;
            }
        }

        const decimalIndex = (numberLength - length) + 1;
        const unsignedNumberCharacterArray = unsignedNumberString.split('');

        const wholePartArray = unsignedNumberCharacterArray.slice(0, decimalIndex);
        const decimalPartArray =
            unsignedNumberCharacterArray.slice(decimalIndex, decimalIndex + decimals + 1);

        const wholePart = wholePartArray.join('');

        // pad decimalPart if necessary
        let decimalPart = decimalPartArray.join('');
        if (decimalPart.length < decimals) {
            decimalPart += `${new Array((decimals - decimalPart.length) + 1).join('0')}`;
        }

        let output;
        if (decimals === 0) {
            output = `${signString}${wholePart}${bigNumPrefixes[numberLengths.indexOf(length)]}`;
        } else {
            const useComma = false;
            let outputNumber = Number(`${wholePart}.${decimalPart}`).toFixed(decimals);
            if (useComma) outputNumber = outputNumber.toString().replace('.', ',');
            output = `${signString}${outputNumber}${bigNumPrefixes[numberLengths.indexOf(length)]}`;
        }

        return output;
    }
}
