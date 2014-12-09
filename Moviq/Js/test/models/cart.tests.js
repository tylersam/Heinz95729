/*global require, describe, it, chai*/
require(['ko', 'models/product', 'models/cart'], function (ko, productCtor, cartCtor) {
    "use strict";

    var Product = productCtor.init(ko),
        viewEngine = { // mock viewEngine
            setView: function (options) {
                currentViewOptions = options;
            }
        },
        Cart = cartCtor.init(ko, viewEngine, Product),
        expect = chai.expect;
    //should = chai.should();

    describe('Cart', function () {

        describe('when constructed with the new operator', function () {
            var sut = new Cart();
            
            it('should be in instance of Cart', function () {
                expect(sut instanceof Cart).to.equal(true);
            });

            sut.setUser();
            it('should have an userId property', function () { expect(sut).to.have.property('userId'); });
            it('should have an products property', function () { expect(sut).to.have.property('products'); });
            it('should have an total property', function () { expect(sut).to.have.property('total'); });
            it('should have an setupCart property', function () { expect(sut).to.have.property('setupCart'); });
            it('should have an setUser property', function () { expect(sut).to.have.property('setUser'); });
            it('should have an loadSavedCart property', function () { expect(sut).to.have.property('loadSavedCart'); });
            it('should have an addToCart property', function () { expect(sut).to.have.property('addToCart'); });
            it('should have an removeFromCart property', function () { expect(sut).to.have.property('removeFromCart'); });
            it('should have an isProductInCart property', function () { expect(sut).to.have.property('isProductInCart'); });
            it('should have an save property', function () { expect(sut).to.have.property('save'); });
            it('should have an clean property', function () { expect(sut).to.have.property('clean'); });

        }); // /describe 'when constructed with the new operator'

        describe('when products in a cart is set', function () {
            var sut = new Cart();
            sut.products = JSON.parse('[{"uid":"dirk_gentlys_detective_agency","title":"Dirk Gently\'s Holistic Detective Agency","description":"There is a long tradition of Great Detectives, and Dirk Gently does not belong to it. But his search for a missing cat uncovers a ghost, a time traveler, AND the devastating secret of humankind! Detective Gently\'s bill for saving the human race from extinction: NO CHARGE.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":6.83,"thumbnailLink":"/images/books/dirkgently.jpeg","tags":null,"_type":"book"},{"uid":"hitchhikers_guide_galaxy","title":"The Hitchhiker\'s Guide to the Galaxy","description":"Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker\'s Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor. Together this dynamic pair begin a journey through space aided by quotes from The Hitchhiker\'s ","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":4.59,"thumbnailLink":"/images/books/hitchiker.jpeg","tags":null,"_type":"book"},{"uid":"universe_everything","title":"Life, the Universe and Everything","description":"The unhappy inhabitants of planet Krikkit are sick of looking at the night sky above their heads--so they plan to destroy it. The universe, that is. Now only five individuals stand between the white killer robots of Krikkit and their goal of total annihilation.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":5.99,"thumbnailLink":"/images/books/lifeandeverything.jpeg","tags":null,"_type":"book"},{"uid":"restaurant_at_end_universe","title":"The Restaurant at the End of the Universe","description":"Facing annihilation at the hands of the warlike Vogons is a curious time to have a craving for tea. It could only happen to the cosmically displaced Arthur Dent and his curious comrades in arms as they hurtle across space powered by pure improbability--and desperately in search of a place to eat.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":6.83,"thumbnailLink":"/images/books/restaurantuniverse.jpeg","tags":null,"_type":"book"}]');
            var product = JSON.parse('{"uid":"dirk_gentlys_detective_agency","title":"Dirk Gently\'s Holistic Detective Agency","description":"There is a long tradition of Great Detectives, and Dirk Gently does not belong to it. But his search for a missing cat uncovers a ghost, a time traveler, AND the devastating secret of humankind! Detective Gently\'s bill for saving the human race from extinction: NO CHARGE.","metadata":{"authors":[{"name":"Douglas Adams"}]},"price":6.83,"thumbnailLink":"/images/books/dirkgently.jpeg","tags":null,"_type":"book"}');

            //it('should calculate total price of products in cart', function () {
            //    expect(sut.total()).to.equal(24.24);
            //});

            //it('should find out if a product is currently in the cart', function () {
            //    expect(sut.isProductInCart(product)).to.equal(true);
            //});
        }); // /describe 'when products in a cart is set'

        describe('the "init" constructor, when called with missing arguments', function () {
            var mut1 = function () { return cartCtor.init(undefined, viewEngine, Product); };

            it('should throw an error when the ko argument is undefined', function () {
                expect(mut1).to.throw('Argument Exception: ko is required to init the cart module');
            });

        }); // /describe 'the "init" constructor, when called with missing arguments'

    }); // /describe 'Cart'

}); // /require
