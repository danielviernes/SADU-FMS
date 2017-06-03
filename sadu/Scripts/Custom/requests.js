﻿$(function () {

    //submit on clicks
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "Session/Login",
            data: $(this).serialize(),
            success: function (data) {
                if (!data) {
                    $('#loginAlert').removeClass('hidden');
                    $('#loginAlert').addClass('alert-danger');
                    $('#loginAlert').text("User not found!");
                }
                else {
                    window.location.href = data;
                }
            },
            error: function (xhr) {
                alert("Login Error" + xhr.responseText);
            }
        });
    });

    $('#createSubmissionForm').submit(function (e) {
        e.preventDefault();
        console.log("create submission request");
        console.log($(this).serialize());
        $.ajax({
            type: "post",
            url: "Submissions/Create",
            data: $(this).serializeArray(),
            success: function (success) {
                if (success) {
                    $("#createSubmissionModal").modal("toggle");
                    updateSubmissionsPartialView();
                    console.log("succesx");
                }
                else {
                    console.log("fail creation");
                }
            },
            error: function (xhs) {
                console.log("error" + xhs.responseText);
            }
        });
    });
});

//functions
function updateSubmissionsPartialView() {
    $.ajax({
        type: "get",
        url: "Submissions/GetSubmissions",
        success: function (partialView) {
            $("#submissionPartial").html(partialView);
            console.log("view loaded");
        },
        error: function (xhs) {
            console.log(xhs.responseText);
        }
    });
}

//an object based on the model is needed to be able to be processed by the controller
function submissionObject(formData) {
    console.log(formData);
    var data = [];
    $.each(formData, function (index, item) {
        data[item.name] = item.val;
    });

    return data;
}