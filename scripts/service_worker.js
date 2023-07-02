"use strict";

importScripts('browser-polyfill.min.js');

const TITLE_OPENREFLINK = "Marah's Reflink öffnen für ";
const APPLICABLE_HOSTS_ALL = ["amazon.de", "humblebundle.com", "www.amazon.de", "www.humblebundle.com"];
const APPLICABLE_HOSTS_AMAZON = ["amazon.de", "www.amazon.de"];
const APPLICABLE_HOSTS_HUMBLEBUNDLE = ["humblebundle.com", "www.humblebundle.com"];

function handleClick(tab) {
  function gotTitle(title) {
    const host = (new URL(tab.url)).host;
    if (APPLICABLE_HOSTS_AMAZON.includes(host)) {
      browser.tabs.update({ url: "https://amzn.to/440wRZW" });
    } else if (APPLICABLE_HOSTS_HUMBLEBUNDLE.includes(host)) {
      browser.tabs.update({ url: "https://www.humblebundle.com/?partner=marah" });
    }
  }

  let gettingTitle = browser.action.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

function websiteIsApplicable(url) {
  const host = (new URL(url)).host;
  return APPLICABLE_HOSTS_ALL.includes(host);
}

function initializeBrowserAction(tab) {
  if (websiteIsApplicable(tab.url)) {
    browser.action.setIcon({ tabId: tab.id, path: "../icons/72.png" });
    browser.action.setTitle({ tabId: tab.id, title: TITLE_OPENREFLINK + (new URL(tab.url)).host });
    browser.action.setPopup({ tabId: tab.id, popup: "" });
  } else {
    browser.action.setIcon({ tabId: tab.id, path: "../icons/72d.png" });
  }
}

let gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializeBrowserAction(tab);
  }
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializeBrowserAction(tab);
});

browser.action.onClicked.addListener(handleClick);