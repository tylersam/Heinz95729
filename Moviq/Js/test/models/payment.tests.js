/*global require, describe, it, chai*/
require(['ko', 'models/payment'], function (ko, paymentCtor) {
    "use strict";

    var viewEngine = { // mock viewEngine
            setView: function (options) {
                currentViewOptions = options;
            }
        },
        Payment = paymentCtor.init(ko, viewEngine),
        expect = chai.expect;
    //should = chai.should();

    describe('Payment', function () {

        describe('when constructed with the new operator', function () {
            var sut = new Payment(null);

            it('should be in instance of Cart', function () {
                expect(sut instanceof Payment).to.equal(true);
            });

            it('should have an months property', function () { expect(sut).to.have.property('months'); });
            it('should have an years property', function () { expect(sut).to.have.property('years'); });
            it('should have an cart property', function () { expect(sut).to.have.property('cart'); });
            it('should have an cardNum property', function () { expect(sut).to.have.property('cardNum'); });
            it('should have an cvc property', function () { expect(sut).to.have.property('cvc'); });
            it('should have an expMonth property', function () { expect(sut).to.have.property('expMonth'); });
            it('should have an expYear property', function () { expect(sut).to.have.property('expYear'); });
            it('should have an billingName property', function () { expect(sut).to.have.property('billingName'); });
            it('should have an billingAddr1 property', function () { expect(sut).to.have.property('billingAddr1'); });
            it('should have an billingAddr2 property', function () { expect(sut).to.have.property('billingAddr2'); });
            it('should have an billingCity property', function () { expect(sut).to.have.property('billingCity'); });
            it('should have an billingState property', function () { expect(sut).to.have.property('billingState'); });
            it('should have an billingZip property', function () { expect(sut).to.have.property('billingZip'); });
            it('should have an billingCountry property', function () { expect(sut).to.have.property('billingCountry'); });
            it('should have an submitPay property', function () { expect(sut).to.have.property('submitPay'); });
            it('should have an editCart property', function () { expect(sut).to.have.property('editCart'); });

        }); // /describe 'when constructed with the new operator'

        describe('the "init" constructor, when called with missing arguments', function () {
            var mut = function () { return paymentCtor.init(undefined, viewEngine); };

            it('should throw an error when the ko argument is undefined', function () {
                expect(mut).to.throw('Argument Exception: ko is required to init the payment module');
            });

        }); // /describe 'the "init" constructor, when called with missing arguments'

    }); // /describe 'Payment'

}); // /require
