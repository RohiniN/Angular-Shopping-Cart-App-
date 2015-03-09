'use strict';

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope, $http) {
    $scope.imageSrc = 'img/phones/motorola-atrix-4g.0.jpg';
    $scope.Imgclass = 'animate';
    $scope.selectedIndex = 0;
    $http.get('phones/phones.json').success(function(data) {
        $scope.phones = data;
    });
    $scope.loadURL = function(obj) {

        $http.get('phones/' + obj.target.id + '.json').success(function(res) {
            $scope.phonesDet = res;

        });
    }
    $scope.setImage = function(obj, $index) {
        $scope.selectedIndex = $index;
        $scope.imageSrc = obj;
    }

    $scope.orderProp = 'age';
});
phonecatApp.controller('RegisterController', function($scope, $http) {
    $scope.user = {};

    $scope.compareExistingUsers = function(obj) {
        $http.get('user/userDetails.json').success(function(data) {
            $scope.user = data;

            if (typeof obj == 'string') { 
                var object = $("#" + obj);
                var inputValue = $("#" + obj).val();//$('userName')
            } else if (typeof obj == 'object') {
                var object = $(obj.target);
                var inputValue = obj.target.value;
            }
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    if (data[prop].userName == inputValue) {
                        // $(obj.target).next(".error-block").html("This User Name already exists");
                        object.parent().append('<div id="userName-error" class="error-block">This User Name already exists.</div>');

                    }
                }
            }
        });


    }
    $scope.registerUser = function(event) {
		event.preventDefault()
	// $scope.compareExistingUsers('userName');
        $('#userRegistration').validate({
                errorElement: 'div',
                errorClass: 'error-block',
                focusInvalid: false,
                rules: {
                    userName: {
                        required: true,
                        lettersonly: true,
						remote: {
							 url: "user/userDetails.json",
							 type: "post",
							  data: {
									username: function(data) {
										alert(data);
									return $( "#username" ).val();
						}
							}
						}

                    },
                    exampleInputPassword1: {
                        required: true,
                        minlength: 5
                    },
                    ConfirmInputPassword1: {
                        required: true,
                        minlength: 5,
                        equalTo: "#exampleInputPassword1"
                    },
                    exampleInputEmail1: {
                        required: true,
                        email: true
                    }
                },

                messages: {
                    userName: {
                        required: "Please choose a user name."
                    },
                    exampleInputPassword1: {
                        required: "Please specify a password.",
                        minlength: "Please specify a password of atleast 5 character."
                    },
                    exampleInputEmail1: {
                        required: "Please provide a password.",
                        email: "Please provide a valid email."
                    },
                    ConfirmInputPassword1: {
                        required: "Please Confirm.",
                        equalTo: "The value you provided does not match with password."
                    }
                },

                invalidHandler: function(event, validator) { //display error alert on form submit   
                    $('.alert-danger', $('.login-form')).show();
                },

                highlight: function(e) {
                    $(e).closest('label.block').addClass('has-error');
                },

                success: function(e) {
                    $(e).closest('label.block').removeClass('has-error');
                    $(e).remove();
                },

                errorPlacement: function(error, element) {
                    if (element.is(':checkbox') || element.is(':radio')) {
                        var controls = element.closest('div[class*="col-"]');
                        if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                        else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                    } else if (element.is('.select2')) {
                        error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                    } else if (element.is('.chosen-select')) {
                        error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                    } else error.insertAfter(element.parent());
                },

              
            }

        );
        if ($("#userRegistration").valid()) {
	
			 $("#userRegistration").trigger('submit');
  
        }
    }
});