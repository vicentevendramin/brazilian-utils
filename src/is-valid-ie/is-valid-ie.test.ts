import { describe, expect, test } from "../_internals/test/runtime";
import { isValidIe } from "./is-valid-ie";

describe("isValidIe", () => {
	describe("should return true for AC", () => {
		test("when IE for AC is correct", () => {
			expect(isValidIe("AC", "0108368143106")).toBe(true);
			expect(isValidIe("AC", "01.349.541/474-57")).toBe(true);
		});
	});
	describe("should return false for AC", () => {
		test("when IE for AC is incorrect", () => {
			// incorrect second digit
			expect(isValidIe("AC", "0187634580933")).toBe(false);
			// incorrect first digit.
			expect(isValidIe("AC", "0187634580924")).toBe(false);
			// it does not starts with 01
			expect(isValidIe("AC", "0018763458000")).toBe(false);
			// length bigger then 13
			expect(isValidIe("AC", "01018763458064")).toBe(false);
		});
	});

	describe("should return true for AL", () => {
		test("when IE for AL is correct", () => {
			expect(isValidIe("AL", "248659758")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("AL", "247424170")).toBe(true);
		});
	});
	describe("should return false for AL", () => {
		test("when IE for AL is incorrect", () => {
			// incorrect verified digit
			expect(isValidIe("AL", "248659759")).toBe(false);
			// it does not starts with 24
			expect(isValidIe("AL", "258659750")).toBe(false);
			// lenght more then 9
			expect(isValidIe("AL", "2486597584")).toBe(false);
		});
	});

	describe("should return true for AP", () => {
		test("when IE for AP is correct", () => {
			expect(isValidIe("AP", "036029572")).toBe(true);
			expect(isValidIe("AP", "030123459")).toBe(true);
			expect(isValidIe("AP", "030000080")).toBe(true);
			expect(isValidIe("AP", "030000160")).toBe(true);
			expect(isValidIe("AP", "030170011")).toBe(true);
			expect(isValidIe("AP", "030170020")).toBe(true);
			expect(isValidIe("AP", "030170071")).toBe(true);
		});
	});
	describe("should return false for AP", () => {
		test("when IE for AP is incorrect", () => {
			// verifier digit false
			expect(isValidIe("AP", "036029573")).toBe(false);
			// more then 9 digits
			expect(isValidIe("AP", "0306029570")).toBe(false);
			// does not start with 03
			expect(isValidIe("AP", "003060292")).toBe(false);
		});
	});

	describe("should return true for AM", () => {
		test("when IE for AM is correct", () => {
			expect(isValidIe("AM", "48.063.523-4")).toBe(true);
			expect(isValidIe("AM", "036029572")).toBe(true);
			expect(isValidIe("AM", "000000019")).toBe(true);
			expect(isValidIe("AM", "046893830")).toBe(true);
		});
	});
	describe("should return false for AM", () => {
		test("when IE for AM is incorrect", () => {
			// verifier digit false
			expect(isValidIe("AM", "036029573")).toBe(false);
			// more then 9 digits
			expect(isValidIe("AM", "0036029572")).toBe(false);
		});
	});

	describe("should return true for BA", () => {
		test("when IE for BA is correct", () => {
			// 8 digits
			// mod 10
			expect(isValidIe("BA", "12345663")).toBe(true);
			// mod 11
			expect(isValidIe("BA", "74219145")).toBe(true);
			// 9 digits
			// mod 10
			expect(isValidIe("BA", "038343081")).toBe(true);
			expect(isValidIe("BA", "100000306")).toBe(true);
			// mod 11
			expect(isValidIe("BA", "778514741")).toBe(true);
			// 9 digits starting with 0
			expect(isValidIe("BA", "078771760")).toBe(true);
			expect(isValidIe("BA", "039474751")).toBe(true);
			expect(isValidIe("BA", "090529323")).toBe(true);
			// 8 digits starting with 0
			expect(isValidIe("BA", "04772253")).toBe(true);
		});
	});
	describe("should return false for BA", () => {
		test("when IE for BA is incorrect", () => {
			// mod 10
			expect(isValidIe("BA", "12345636")).toBe(false);
			// mod 11
			expect(isValidIe("BA", "74219154")).toBe(false);

			// 9 digits
			// mod 10
			expect(isValidIe("BA", "038343001")).toBe(false);
			// mod 11
			expect(isValidIe("BA", "778514731")).toBe(false);
			// more than 9 digits
			expect(isValidIe("BA", "0012345636")).toBe(false);
		});
	});

	describe("should return true for CE", () => {
		test("when IE for CE is correct", () => {
			expect(isValidIe("CE", "853511942")).toBe(true);
		});
	});
	describe("should return false for CE", () => {
		test("when IE for CE is incorrect", () => {
			expect(isValidIe("CE", "853511943")).toBe(false);
			// more than 9 digits
			expect(isValidIe("CE", "0853511942")).toBe(false);
		});
	});

	describe("should return true for DF", () => {
		test("when IE for DF is correct", () => {
			expect(isValidIe("DF", "0754002000176")).toBe(true);
			// tenth digit converted to 0
			expect(isValidIe("DF", "0754002000508")).toBe(true);
		});
	});
	describe("should return false for DF", () => {
		test("when IE for DF is incorrect", () => {
			// does not start with 07
			expect(isValidIe("DF", "0108368143017")).toBe(false);
			// does not have 13 digits
			expect(isValidIe("DF", "07008368143094")).toBe(false);
			// digit incorrect
			expect(isValidIe("DF", "0754002000175")).toBe(false);
		});
	});

	describe("should return true for ES", () => {
		test("when IE for ES is correct", () => {
			expect(isValidIe("ES", "639191444")).toBe(true);
		});
	});
	describe("should return false for ES", () => {
		test("when IE for ES is incorrect", () => {
			expect(isValidIe("ES", "639191445")).toBe(false);
			// more than 9 digits
			expect(isValidIe("ES", "0639191444")).toBe(false);
		});
	});

	describe("should return true for GO", () => {
		test("when IE for GO is correct", () => {
			// base rule
			expect(isValidIe("GO", "109161793")).toBe(true);
			// verified digit is 1, internal
			expect(isValidIe("GO", "101031131")).toBe(true);
			// verified digit is 1, external
			expect(isValidIe("GO", "101030940")).toBe(true);
		});
	});
	describe("should return false for GO", () => {
		test("when IE for GO is incorrect", () => {
			// verified digit incorrect
			expect(isValidIe("GO", "109161794")).toBe(false);
			// does not start with 10,11 or 15
			expect(isValidIe("GO", "121031131")).toBe(false);
			// length different from 9
			expect(isValidIe("GO", "0101030940")).toBe(false);
		});
	});

	describe("should return true for MA", () => {
		test("when IE for MA is correct", () => {
			// base rule
			expect(isValidIe("MA", "120000008")).toBe(true);
			// digit 11 converted to zero
			expect(isValidIe("MA", "120000040")).toBe(true);
			// digit 10 converted to 1
			expect(isValidIe("MA", "120000130")).toBe(true);
		});
	});
	describe("should return false for MA", () => {
		test("when IE for MA is incorrect", () => {
			// verified digit incorrect
			expect(isValidIe("MA", "120000007")).toBe(false);
			// does not start with 12
			expect(isValidIe("MA", "109161793")).toBe(false);
			// length different from 9
			expect(isValidIe("MA", "0120000008")).toBe(false);
		});
	});

	describe("should return true for MG", () => {
		test("when IE for MG is correct", () => {
			// base rule
			expect(isValidIe("MG", "4333908330177")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("MG", "4333908330410")).toBe(true);
			expect(isValidIe("MG", "7489439278602")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("MG", "4333908332560")).toBe(true);
		});
	});
	describe("should return false for MG", () => {
		test("when IE for MG is incorrect", () => {
			// first verified digit incorrect
			expect(isValidIe("MG", "4333908330167")).toBe(false);
			// length different from 13
			expect(isValidIe("MG", "04333908330177")).toBe(false);
			// second verified digit incorrect
			expect(isValidIe("MG", "4333908330176")).toBe(false);
		});
	});

	describe("should return true for MT", () => {
		test("when IE for MT is correct", () => {
			// base rule
			expect(isValidIe("MT", "60474120469")).toBe(true);
		});
	});
	describe("should return false for MT", () => {
		test("when IE for MT is incorrect", () => {
			// verified digit incorrect
			expect(isValidIe("MT", "12345678901")).toBe(false);
			// length different from 11
			expect(isValidIe("MT", "1234567890112")).toBe(false);
		});
	});

	describe("should return true for MS", () => {
		test("when IE for MS is correct", () => {
			// base rule
			expect(isValidIe("MS", "280000006")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("MS", "280000090")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("MS", "280000030")).toBe(true);
		});
	});
	describe("should return false for MS", () => {
		test("when IE for MS is incorrect", () => {
			// verified digit incorrect
			expect(isValidIe("MS", "280000031")).toBe(false);
			// length different from 9
			expect(isValidIe("MS", "0280000006")).toBe(false);
			// does not start with 28
			expect(isValidIe("MS", "853511942")).toBe(false);
		});
	});

	describe("should return true for PA", () => {
		test("when IE for PA is correct", () => {
			// base rule
			expect(isValidIe("PA", "150000006")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("PA", "150000260")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("PA", "150000030")).toBe(true);
		});
	});
	describe("should return false for PA", () => {
		test("when IE for PA is incorrect", () => {
			// does not start with 15
			expect(isValidIe("PA", "120000008")).toBe(false);
			// length different from 9
			expect(isValidIe("PA", "0150000006")).toBe(false);
			// digit incorrect
			expect(isValidIe("PA", "150000007")).toBe(false);
		});
	});

	describe("should return true for PB", () => {
		test("when IE for PB is correct", () => {
			// base rule
			expect(isValidIe("PB", "853511942")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("PB", "853512230")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("PB", "853511950")).toBe(true);
		});
	});
	describe("should return false for PB", () => {
		test("when IE for PB is incorrect", () => {
			// length different from 9
			expect(isValidIe("PB", "0853511942")).toBe(false);
			// digit incorrect
			expect(isValidIe("PB", "853511943")).toBe(false);
		});
	});

	describe("should return true for PE", () => {
		test("when IE for PE is correct", () => {
			// base rule
			expect(isValidIe("PE", "288625706")).toBe(true);
		});
	});
	describe("should return false for PE", () => {
		test("when IE for PE is incorrect", () => {
			// length different from 9 digits
			expect(isValidIe("PE", "0925870110")).toBe(false);
			// digit incorrect
			expect(isValidIe("PE", "925870101")).toBe(false);
		});
	});

	describe("should return true for PI", () => {
		test("when IE for PI is correct", () => {
			// base rule
			expect(isValidIe("PI", "052364534")).toBe(true);
		});
	});

	describe("should return true for PR", () => {
		test("when IE for PR is correct", () => {
			// base rule
			expect(isValidIe("PR", "4447953604")).toBe(true);
		});
	});
	describe("should return false for PR", () => {
		test("when IE for PR is incorrect", () => {
			// length different from 10 digits
			expect(isValidIe("PR", "04447953604")).toBe(false);
			// digit incorrect
			expect(isValidIe("PR", "4447953640")).toBe(false);
		});
	});

	describe("should return true for RJ", () => {
		test("when IE for RJ is correct", () => {
			// base rule
			expect(isValidIe("RJ", "62545372")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("RJ", "62545470")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("RJ", "62545380")).toBe(true);
		});
	});
	describe("should return false for RJ", () => {
		test("when IE for RJ is incorrect", () => {
			// first verified digit incorrect
			expect(isValidIe("RJ", "20441620")).toBe(false);
			// length different from 8
			expect(isValidIe("RJ", "020441623")).toBe(false);
		});
	});

	describe("should return true for RN", () => {
		test("when IE for RN is correct", () => {
			// base rule
			expect(isValidIe("RN", "2007693232")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("RN", "2003569880")).toBe(true);
			// old IE
			expect(isValidIe("RN", "203569881")).toBe(true);
		});
	});
	describe("should return false for RN", () => {
		test("when IE for RN is incorrect", () => {
			// first verified digit incorrect
			expect(isValidIe("RN", "2007693231")).toBe(false);
			// does not start with 20
			expect(isValidIe("RN", "0203569881")).toBe(false);
			// length different from 9 or 10
			expect(isValidIe("RN", "20356988104")).toBe(false);
		});
	});

	describe("should return true for RO", () => {
		test("when IE for RO is correct", () => {
			// base rule
			expect(isValidIe("RO", "01078042249629")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("RO", "01078042249670")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("RO", "01078042249751")).toBe(true);
		});
	});
	describe("should return false for RO", () => {
		test("when IE for RO is incorrect", () => {
			// first verified digit incorrect
			expect(isValidIe("RO", "01078042249756")).toBe(false);
			// length different from 14
			expect(isValidIe("RO", "001078042249627")).toBe(false);
		});
	});

	describe("should return true for RR", () => {
		test("when IE for RR is correct", () => {
			// base rule
			expect(isValidIe("RR", "240061536")).toBe(true);
		});
	});
	describe("should return false for RR", () => {
		test("when IE for RR is incorrect", () => {
			// first verified digit incorrect
			expect(isValidIe("RR", "240061537")).toBe(false);
			// length different from 9
			expect(isValidIe("RR", "2400615366")).toBe(false);
			// does not start with 24
			expect(isValidIe("RR", "024006150")).toBe(false);
		});
	});

	describe("should return true for RS", () => {
		test("when IE for RS is correct", () => {
			// base rule
			expect(isValidIe("RS", "0305169149")).toBe(true);
			// digit 10 converted to 0
			expect(isValidIe("RS", "1202762660")).toBe(true);
			// digit 11 converted to 0
			expect(isValidIe("RS", "1202762120")).toBe(true);
		});
	});
	describe("should return false for RS", () => {
		test("when IE for RS is incorrect", () => {
			// first verified digit incorrect
			expect(isValidIe("RS", "2007693232")).toBe(false);
			// length different from 10
			expect(isValidIe("RS", "02007693230")).toBe(false);
		});
	});

	describe("should return true for SC", () => {
		test("when IE for SC is correct", () => {
			// base rule
			expect(isValidIe("SC", "330430572")).toBe(true);
		});
	});

	describe("should return true for SE", () => {
		test("when IE for SE is correct", () => {
			// base rule
			expect(isValidIe("SE", "017682606")).toBe(true);
		});
	});

	describe("should return true for SP", () => {
		test("when IE for SP is correct", () => {
			// base rule
			expect(isValidIe("SP", "110042490114")).toBe(true);
		});
	});
	describe("should return false for SP", () => {
		test("when IE for SP is incorrect", () => {
			// length bigger than 12
			expect(isValidIe("SP", "1110042494114")).toBe(false);
			// second verified digit incorrect
			expect(isValidIe("SP", "110042490113")).toBe(false);
			// first verified digit incorrect
			expect(isValidIe("SP", "110042498113")).toBe(false);
		});
	});

	describe("should return true for TO", () => {
		test("when IE for TO is correct", () => {
			// OLD base rule
			expect(isValidIe("TO", "01027737427")).toBe(true);

			// NEW base rule
			expect(isValidIe("TO", "294467696")).toBe(true);

			// Digit zero
			expect(isValidIe("TO", "294150870")).toBe(true);
		});
	});
	describe("should return false for TO", () => {
		test("when IE for TO is incorrect", () => {
			// Old rule category invalid
			expect(isValidIe("TO", "01047737427")).toBe(false);

			// more than 11 digits
			expect(isValidIe("TO", "099999916599")).toBe(false);

			// verified digit incorrect
			expect(isValidIe("TO", "99999916598")).toBe(false);

			// new rule verified digit incorrect
			expect(isValidIe("TO", "294467690")).toBe(false);
		});
	});
});
