#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nextStart", {
    enumerable: true,
    get: function () {
        return nextStart;
    }
});
require("./node_modules/next/dist/server/lib/cpu-profile");
const _startserver = require("./node_modules/next/dist/server/lib/start-server");
const _utils = require("./node_modules/next/dist/server/lib/utils");
const _getprojectdir = require("./node_modules/next/dist/lib/get-project-dir");
const _getreservedport = require("./node_modules/next/dist/lib/helpers/get-reserved-port");

const nextStart = async () => {
    // Set the arguments directly here
    const args = {
        dir: process.cwd(), // Use the current working directory
        hostname: "0.0.0.0", // Replace with the desired hostname
        port: 3000, // Replace with the desired port
        isExperimentalTestProxy: false, // Set to true if you want to enable the experimental test proxy
        keepAliveTimeout: 5000 // Set the desired keep alive timeout in milliseconds
    };

    const dir = (0, _getprojectdir.getProjectDir)(args.dir);
    const host = args.hostname;
    const port = args.port;

    console.log(`Starting Next.js server in directory: ${dir}`);
    console.log(`Using hostname: ${host}`);
    console.log(`Using port: ${port}`);

    if ((0, _getreservedport.isPortIsReserved)(port)) {
        (0, _utils.printAndExit)((0, _getreservedport.getReservedPortExplanation)(port), 1);
    }

    const isExperimentalTestProxy = args.isExperimentalTestProxy;
    const keepAliveTimeoutArg = args.keepAliveTimeout;
    if (typeof keepAliveTimeoutArg !== "undefined" && (Number.isNaN(keepAliveTimeoutArg) || !Number.isFinite(keepAliveTimeoutArg) || keepAliveTimeoutArg < 0)) {
        (0, _utils.printAndExit)(`Invalid keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`, 1);
    }
    const keepAliveTimeout = keepAliveTimeoutArg ? Math.ceil(keepAliveTimeoutArg) : undefined;

    try {
        await (0, _startserver.startServer)({
            dir,
            isDev: false,
            isExperimentalTestProxy,
            hostname: host,
            port,
            keepAliveTimeout
        });
        console.log(`Next.js server started at http://${host}:${port}`);
    } catch (error) {
        console.error("Error starting Next.js server:", error);
    }
};

nextStart()
