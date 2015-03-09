'use strict';

var shopCartApp = angular.module('shopCartApp', []);

shopCartApp.controller('SelItemListCtrl', function($scope, $http) {
    $scope.phones;
    $scope.users;
    $scope.wishlist = [];
    $scope.isCartEmpty = false;
    $scope.addToWishList = false;
    $scope.isWishListEmpty = true;
    $http.get('shopping-cart/shoppingCart.json').success(function(data) {
        $scope.phones = data;
    });
    $http.get('user/userDetails.json').success(function(resp) {
        $scope.users = resp;

        for (var prop in resp) {
            if (resp.hasOwnProperty(prop)) {

                if (resp[prop].active) {
                    $scope.CurrUser = resp[prop].userName;
                    $scope.email = resp[prop].email;
                }


            }
        }

    });

    $scope.removeItem = function(obj, objId, event) {
        /*  if (event.target.attributes.data) {		  
 var clickedElm = event.target.attributes.data.value;
		//	console.log(wishList);removeItemFromWishlist($index,phone.id,true)
	console.log(event.target.attributes.data)	 
		  	//  $scope.wishlist
		   }*/
        for (var prop in $scope.phones) {
            if ($scope.phones.hasOwnProperty(prop)) {
                if (objId == $scope.phones[prop].id) {
                    if (event) {
                        $scope.wishlist.push($scope.phones[prop]);
                    }

                    $scope.phones[prop].remove;
                    $scope.phones.splice(prop, 1);
                    $scope.checkEmpty();

                }


            }
        }

    }

 $scope.removeItemWhishList = function(obj, objId) {

        for (var prop in $scope.wishlist) {
            if ($scope.wishlist.hasOwnProperty(prop)) {
                if (objId == $scope.wishlist[prop].id) {
					$scope.wishlist[prop].remove;
                    $scope.wishlist.splice(prop, 1);
                    $scope.checkEmpty();

                }


            }
        }

    }	
    $scope.AddToShCart = function(obj, objId) {

        for (var prop in $scope.wishlist) {
            if ($scope.wishlist.hasOwnProperty(prop)) {
                if (objId == $scope.wishlist[prop].id) {

                    $scope.phones.push($scope.wishlist[prop]);
                    $scope.wishlist[prop].remove;
                    $scope.wishlist.splice(prop, 1);
                    $scope.checkEmpty();
                }


            }
        }


    }
    $scope.checkEmpty = function() {
        if ($scope.phones.length == 0) {
            $scope.isCartEmpty = true;
        } else {
            $scope.isCartEmpty = false;
        }
        if ($scope.wishlist.length == 0) {
            $scope.isWishListEmpty = true;
        } else {
            $scope.isWishListEmpty = false;
        }



    }
    $scope.orderProp = 'age';
});