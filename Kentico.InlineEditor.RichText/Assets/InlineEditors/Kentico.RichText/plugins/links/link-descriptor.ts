export class LinkDescriptor {
    public readonly linkText: string;
    public readonly linkURL: string;
    public readonly openInNewTab: boolean;
    public readonly imageLink: boolean;

    constructor(anchorElement: HTMLAnchorElement);
    constructor(linkText: string, linkURL?: string, openInNewTab?: boolean, imageLink?: boolean);
    constructor(link: string | HTMLAnchorElement, linkURL: string = "", openInNewTab: boolean = false, imageLink: boolean = false) {
        if (typeof link === "string") {
            this.linkText = link.trim().length === 0 ? "" : link;
            this.linkURL = linkURL;
            this.openInNewTab = openInNewTab;
            this.imageLink = imageLink;
        } else {
            this.linkText = link.text;
            this.linkURL = link.getAttribute("href") || "";
            this.openInNewTab = link.target === "_blank";
            this.imageLink = !!link.querySelector('img');
        }
    }
}
