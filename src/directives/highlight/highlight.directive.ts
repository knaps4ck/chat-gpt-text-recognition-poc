import { Directive, ElementRef, Input, OnChanges } from "@angular/core";

@Directive({
  selector: "[plTextHighlight]",
  standalone: true,
})
export class HighlightDirective implements OnChanges {
  private _content: string;
  private _searchTerms: string[];

  private separatedText: string[] = [];
  private separatedSearchedText: any = [];

  private final = "";

  searchPattern: any;
  matchpattern: any;

  splitFlag = "";
  matchFlag = "";

  spanStart = '<span class="bg-warning">';
  spanEnd = "</span>";

  @Input()
  set content(content: string) {
    this._content = content;
  }
  get content(): string {
    return this._content;
  }

  @Input()
  set searchTerms(searchTerms: string[]) {
    this._searchTerms = searchTerms;
    this.highlight();
  }
  get searchTerms(): string[] {
    return this._searchTerms;
  }

  @Input() caseSensitive: boolean;

  constructor(private el: ElementRef) {
    this.caseSensitive = false;
  }

  ngOnChanges() {
    this.highlight();
  }

  highlight() {
    if (!this.caseSensitive) {
      this.splitFlag = "i";
      this.matchFlag = "gi";
    } else {
      this.splitFlag = "";
      this.matchFlag = "g";
    }

    let content = this._content;

    for (let searchTerm of this._searchTerms) {
      this.final = "";

      if (searchTerm.includes("$")) {
        searchTerm = searchTerm.replace("$", "\\$");
      }

      if (searchTerm[0] === '"') {
        searchTerm = searchTerm.replace(/^"(.+)"$/, "$1").replace(/\.$/, "");
      }

      this.searchPattern = new RegExp(searchTerm, this.splitFlag);
      this.matchpattern = new RegExp(searchTerm, this.matchFlag);

      this.separatedText = content.split(this.searchPattern);
      this.separatedSearchedText = content.match(this.matchpattern);

      if (
        this.separatedSearchedText != null &&
        this.separatedSearchedText.length > 0
      ) {
        for (let i = 0; i < this.separatedText.length; i++) {
          if (i <= this.separatedSearchedText.length - 1) {
            this.final +=
              this.separatedText[i] +
              this.spanStart +
              this.separatedSearchedText[i] +
              this.spanEnd;
          } else {
            this.final += this.separatedText[i];
          }
        }
      }

      if (this.final.length > 0) {
        content = this.final;
      }
    }

    this.el.nativeElement.innerHTML = content;
  }
}
