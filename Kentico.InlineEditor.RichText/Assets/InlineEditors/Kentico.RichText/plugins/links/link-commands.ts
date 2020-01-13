import FroalaEditor, { RegisterCommandParameters } from "froala-editor/js/froala_editor.pkgd.min";

import * as constants from "./link-constants";

import { FroalaCommand } from "../../froala-command";
import { FroalaIcon } from "../../froala-icon";
import { getString } from "./link-helpers";
import { getDialogElement } from "../popup-helper";
import { LinkType } from "./link-types";
import { showForm } from "./popups/link-configuration-popup";
import { LinkModel } from "./link-model";
import { LinkDescriptor } from "./link-descriptor";
import { unwrapElement } from "../../helpers";

let defaultLinkDescriptor: LinkDescriptor;

// Open insert link popup

const openInsertLinkPopupCommandParameters: RegisterCommandParameters = {
    title: getString("Command.InsertLink"),
    focus: false,
    undo: false,
    plugin: constants.LINK_PLUGIN_NAME,
    refreshAfterCallback: true,
    callback(this: FroalaEditor) {
        this.selection.save();
        const linkText = this.selection.text();
        const linkImage = this.image.getEl();

        defaultLinkDescriptor = new LinkDescriptor(linkText, undefined, undefined, !!linkImage);

        const boundingRect = !linkImage
            ? this.position.getBoundingRect()
            : getImageBoundingRect(linkImage[0]);

        this.kenticoLinkPlugin.showInsertLinkPopup(boundingRect, defaultLinkDescriptor);
    }
};

const openInsertImageLinkPopupCommandParameters = {
    ...openInsertLinkPopupCommandParameters,
    refresh(this: FroalaEditor, $button: JQuery) {
        const button = unwrapElement($button);

        if (!button){
            return;
        }

        if (this.link.get()) {
            button.classList.add('fr-hidden');
        } else {
            button.classList.remove('fr-hidden');
      }
    }
}

const openInsertLinkPopupCommand = new FroalaCommand(constants.OPEN_INSERT_LINK_POPUP_COMMAND_NAME, openInsertLinkPopupCommandParameters);
const openInsertImageLinkPopupCommand = new FroalaCommand(constants.OPEN_INSERT_IMAGE_LINK_POPUP_COMMAND_NAME, openInsertImageLinkPopupCommandParameters);

// Close link configuration popup

const closeLinkConfigurationPopupCommandIcon = new FroalaIcon(constants.CLOSE_LINK_CONFIGURATION_POPUP_COMMAND_NAME, { NAME: "arrow-left", SVG_KEY: "back" });
const closeLinkConfigurationPopupCommand = new FroalaCommand(constants.CLOSE_LINK_CONFIGURATION_POPUP_COMMAND_NAME, {
    title: getString("Command.Back"),
    undo: false,
    focus: false,
    callback(this: FroalaEditor) {
        this.kenticoLinkPlugin.hideLinkConfigurationPopup();
    }
}, closeLinkConfigurationPopupCommandIcon);

// Insert link

const insertLinkCommandParameters: RegisterCommandParameters = {
    title: "",
    undo: true,
    focus: false,
    callback(this: FroalaEditor, command: string) {
        const isGeneralLink = command === constants.INSERT_GENERAL_LINK_COMMAND_NAME;
        const link = getLinkData(this, isGeneralLink);

        if (!link) {
            this.kenticoLinkPlugin.hideLinkConfigurationPopup();
            return;
        }

        this.link.insert(link.linkURL, link.linkText, link.openInNewTab ? { target: "_blank" } : undefined);
        this.kenticoLinkPlugin.hideLinkConfigurationPopup();
    }
}

const insertPageLinkCommand = new FroalaCommand(constants.INSERT_PAGE_LINK_COMMAND_NAME, insertLinkCommandParameters);
const insertGeneralLinkCommand = new FroalaCommand(constants.INSERT_GENERAL_LINK_COMMAND_NAME, insertLinkCommandParameters);

// Open link configuration popup
const openLinkConfigurationPopupCommandIcon = new FroalaIcon(constants.OPEN_LINK_CONFIGURATION_POPUP_COMMAND_NAME, { NAME: "edit", SVG_KEY: "editLink" });
const openLinkConfigurationPopupCommand = new FroalaCommand(constants.OPEN_LINK_CONFIGURATION_POPUP_COMMAND_NAME, {
    title: getString("Command.EditLink"),
    undo: false,
    focus: false,
    refresh(this: FroalaEditor, $button: any) {
        const button = unwrapElement($button);

        if (!button){
            return;
        }

        if (this.link.get()) {
            button.classList.remove('fr-hidden');
        } else {
            button.classList.add('fr-hidden');
      }
    },
    async callback(this: FroalaEditor) {
        const link = this.link.get() as HTMLAnchorElement;
        const linkImage = this.image.getEl();

        const boundingRect = (!linkImage)
            ? this.position.getBoundingRect()
            : getImageBoundingRect(linkImage[0]);

        await this.kenticoLinkPlugin.showLinkConfigurationPopup(boundingRect, new LinkDescriptor(link));
    }
}, openLinkConfigurationPopupCommandIcon);

// Switch page link tab command

const switchPageLinkTabCommandIcon = new FroalaIcon(constants.SWITCH_PAGE_LINK_TAB_COMMAND_NAME, { NAME: "link", SVG_KEY: "insertLink" });
const switchPageLinkTabCommand = new FroalaCommand(constants.SWITCH_PAGE_LINK_TAB_COMMAND_NAME, {
    title: getString("Command.PageLinkTab"),
    undo: false,
    focus: false,
    callback(this: FroalaEditor) {
        showForm(this, constants.INSERT_LINK_POPUP_NAME, defaultLinkDescriptor, new LinkModel(LinkType.PAGE));
    }
}, switchPageLinkTabCommandIcon);

// Switch general link tab command

const switchGeneralLinkTabCommandIcon = new FroalaIcon(constants.SWITCH_GENERAL_LINK_TAB_COMMAND_NAME, { NAME: "link", SVG_KEY: "openLink" });
const switchGeneralLinkTabCommand = new FroalaCommand(constants.SWITCH_GENERAL_LINK_TAB_COMMAND_NAME, {
    title: getString("Command.GeneralLinkTab"),
    undo: false,
    focus: false,
    callback(this: FroalaEditor) {
        showForm(this, constants.INSERT_LINK_POPUP_NAME, defaultLinkDescriptor, new LinkModel(LinkType.EXTERNAL));
    }
}, switchGeneralLinkTabCommandIcon);

const getLinkData = (editor: FroalaEditor, isGeneralLink: boolean): LinkDescriptor | null => {
    const popupName = getVisiblePopupName(editor);
    const popupElement = getDialogElement(editor, popupName!);
    if (!popupElement) {
        return null;
    }

    let link = extractFormData(popupElement);

    if (!link.linkURL) {
        return null;
    }
    if (!link.linkText) {
        const linkText = isGeneralLink ? link.linkURL : popupElement.querySelector<HTMLElement>(".ktc-page-name")!.innerText;

        link = new LinkDescriptor(linkText, link.linkURL, link.openInNewTab);
    }

    return link;
}

const extractFormData = (popupElement: HTMLElement): LinkDescriptor => {
    const form = popupElement.querySelector<HTMLFormElement>("#ktc-link-popup-form");
    const formData = new FormData(form!);

    return {
        linkURL: formData.get("linkUrl") as string,
        linkText: formData.get("linkText") as string,
        openInNewTab: Boolean(formData.get("openInNewTab")),
        imageLink: false
    }
}

const getVisiblePopupName = (editor: FroalaEditor) => {
    if (editor.popups.isVisible(constants.INSERT_LINK_POPUP_NAME)) {
        return constants.INSERT_LINK_POPUP_NAME;
    } else if (editor.popups.isVisible(constants.CONFIGURE_PAGE_LINK_POPUP_NAME)) {
        return constants.CONFIGURE_PAGE_LINK_POPUP_NAME;
    } else if (editor.popups.isVisible(constants.CONFIGURE_GENERAL_LINK_POPUP_NAME)) {
        return constants.CONFIGURE_GENERAL_LINK_POPUP_NAME;
    }
}

const getImageBoundingRect = (linkImage: HTMLImageElement) : DOMRect => {
    return new DOMRect(
        linkImage.getBoundingClientRect().left  + (linkImage.getBoundingClientRect().width / 2) - (constants.POPUP_WIDTH_PX / 2),
        linkImage.getBoundingClientRect().top + linkImage.getBoundingClientRect().height
    );
}

export const linkCommands = [
    openInsertLinkPopupCommand,
    openInsertImageLinkPopupCommand,
    openLinkConfigurationPopupCommand,
    closeLinkConfigurationPopupCommand,
    insertPageLinkCommand,
    insertGeneralLinkCommand,
    switchPageLinkTabCommand,
    switchGeneralLinkTabCommand
]
