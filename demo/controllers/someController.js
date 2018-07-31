const express = require('express');

const someController = {
  setCookie: function setCookie(req, res, next) {
    res.cookie('Just-a', 'cookie!');
    res.cookie('Also-a', 'cookie!', {
      httpOnly: true,
      maxAge: 900000,
    });
    next();
  },

  verifyUser: function verifyUser(req, res, next) {
    // Eh, you're fine!
    next();
  },

  login: function login(req, res) {
    res.redirect('/');
  },

  createUser: function signup(req, res, next) {
    // Another time, maybe
    next();
  },

  isLoggedIn: function isLoggedIn(req, res, next) {
    // Duh!
    next();
  },
};

module.exports = someController;
