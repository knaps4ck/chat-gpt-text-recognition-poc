import { ThisReceiver } from "@angular/compiler";
import { Component, ElementRef, OnInit } from "@angular/core";
import { OpenAIApi, Configuration } from "openai";
import { async } from "rxjs";
import { environment } from "src/environment/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  finalsBrands: any = [];
  brands: any = [];
  texts: any = [];
  text: string = "";
  transcriptionProcessing = false;
  items: string[] = [];
  fileName: string = "";
  event: any;
  //"So shop, save shop. Local New York Rangers game night is on the air pat from the MSG Radio Network. The New York Rangers are steamrolling toward the all star break. Two straight wins and five in their last six have ball to them back into first place in the metropolitan division. Four games to go until a two week break. And that set of four games begins tonight in Columbus against the division rival Blue Jackets. The BetRivers on sports books, New York Rangers pregame show brought to you by BetRivers bet on the New York game on BetRivers online sports book, Monday night, high drama at Madison Square Garden. The Rangers after tying the kings late in the third period found themselves in a shootout after our timmy panarin and Alexis Lafraniere each scored with the Rangers backs to the wall up. Stepped Adam Fox. No moving it on the Connecticut native. Quick Fox. He shoots doors. Rangers win goes up top but was caught at the top. What can't he do? The Rangers improving to 28 11 and four after the 3 to 2 shootout win. They're 60 points the most in the metropolitan. However, the Rangers Penguins, Hurricanes and Cavs are all separated by just five points in the standings and then comes tonight's opponent. The Blue Jackets are in fifth place but it is a distant fifth if the playoffs started today. Columbus would be 14 points out of the final wild card spot. The Rangers have handled them twice this season out scoring them by a combined margin of 9 to 3 with one game at the guard and the other at nationwide arena where tonight's matchup will be played time for this date in Rangers history. We're going to go way back 67 years ago. January 27th, 1955. This is a good one. Gordie Howe set an unofficial record by taking 19 shots on goal for the Red Wings in a 3 to 3 tie with the Rangers blue shirts. Goalie Gump Ley stopped Howe on all night 19 shots. He did not register a point. However, his brother Vick How got a goal scoring for the Rangers in the third period of that game, 19 shots on goal in a single game. It is time for what's on tap served up by White Claw® Hard Seltzer Surge. We'll hear from Gerard Glanz on Monday's dramatic win over the Kings Julian Gautier on playing on the top line with and Chris Kreider and Brandon Schneider who has been opening the eyes of his head coach and many others with his recent play. That's what's on tap served up by White Claw® Hard Seltzer Surge, a stronger wave of refreshment with 8% alcohol available in blackberry, natural lime, blood orange and cranberry. I'm Pat o'keefe. And you're listening to New York Rangers Hockey on 98.7 ESPN New York and the MSG Radio Network, the Honda Hr V CRV, Pilot, Passport and ridge line. They all have one thing in common. They never back off from a challenge available with All Wheel Drive. The Honda Suv lineup has the performance you can count on and the capability to amaze. That's why we're America's most loved auto brand 2021 American customer satisfaction index. A survey of customers rating the performance of their own automobiles, contact your local Honda dealer for a great deal. Today, ranger fans, when deciding to take a charter bus, there is only one choice that's best trails and travel. New York City's premier charter bus company. Best trails and travel have the highest level of charter bus service in New York City and been serving New York's leading corporations, professional sports teams and private individuals for over 25 years. They offer premier customer service and the newest fleet of buses in the industry. Whether you're traveling with family, friends or colleagues, best trails and travel guarantees you the ultimate traveling experience. Visit them at besttrailstravel.com or call 212, 206 69 74. Be ready for winter weather and save money at o'reilly Auto parts. It's time to replace your old wiper blades with a new pair of Bosch icon wiper blades right now. Save $8 per pair and earn double all rewards points. Our professional parts people will even install them for you for free. Visit your local o'reilly Auto parts store or online at o'reilly auto dot com. Auto parts. You could save big when you bundle your home and auto with progressive. But when we just come out and say it, it feels like it falls a bit flat. So we're gonna sing it. Sing the business part. Now, that's a commercial. You'll remember even if you don't remember the bundle and teeth with progressive part. We're singing progressive casualty insurance company and bill gets discount not available in all these situations. You a drink the pa I'll keep back with you on the BetRivers online sports books, New York Rangers, pregame show Rangers out in Columbus tonight to take on the Blue Jackets. Third meeting of the season. Rangers in first place in the metropolitan division. Interesting finish to Monday night's game at Madison Square Garden. The Rangers winning that one in a shootout. And as I mentioned earlier twice, they had their backs to the wall where they needed a goal to extend the shootout. Are panarin Alexis Lafraniere coming through both times setting up, Adam Fox's eventual game winner. Now lafraniere situation was interesting because he only played nine minutes and nine seconds the entire game. That was the third fewest among forwards. Rangers were trailing in that third period. Gerard Galan, tightening his rotation going to three lines and lafraniere was left out and after practice yesterday, Galante was asked if last he's scoring that shootout goal after not playing much in the third period is a good sign for the youngster. Oh, yeah. No, I mean, again, he's a young player, the guy, it's all about winning for our team. It's not about who's going to be out there the most and, you know, if he doesn't play, you know, 12 minutes, he, you know, he's still a part of a big part of our team. They're all a big part of our team and they want to win games and that's the best. The best thing about our group is, you know, it's about winning games and it's not about personal, personal goals here. And I think that's why they're striving right now. They got to keep going out with that and we're having fun and enjoying it and finding ways to win games. If you take a side by side comparison of la's first two NHL seasons last year, 21 points in 56 games played this season, 11 points in 41 games. He's got eight goals and three assists and his time on ice, his average time on ice is down as well. Last year, he averaged 13 minutes and 53 seconds this year 13, 27. But his head coach says ice time is not the only thing that he views as important. We talked about that earlier. I wouldn't want a kid play a kid for two minutes or three minutes in the game. That, that's not right. There's no development there. But you're talking 8, 12, 15 minutes. You know, that, that's, that's a big part of the game. It's an important part of the game. It's not your top line players playing that, but the 3rd and 4th line sometimes that's the way the game goes. That's how it ends up some nights and it's not because we're disappointed in their play. But that's, you know, when you're playing your top guys, 20 minutes or 21 minutes, certain nights it happens and a reminder fans tomorrow night, a special night at Madison Square Garden, the Henrik ";

  randText: string = '<span class="bg-warning">asdasdasd</span>';

  spanStart = '<span class="bg-warning">';
  spanEnd = "</span>";
  promptText: string = "Extract commercials";

  constructor() {}

  async ngOnInit(): Promise<void> {}

  onFileSelected(event: any) {
    this.event = event;
    var reader = new FileReader();
    reader.onload = () => {
      this.text = reader.result ? reader.result?.toString() : "";
    };

    this.fileName = event.target.files[0].name;

    reader.readAsText(event.target.files[0]);
  }

  onStartTranscribe() {
    this.texts = [];
    this.onFileSelected(this.event);
    this.preprocessTranscription(this.text);
    this.processTranscription();
  }

  async processTranscription() {
    this.transcriptionProcessing = true;
    const configuration = new Configuration({
      apiKey: environment.OPENAI_API_KEY,
    });

    configuration.baseOptions.headers = {
      Authorization: "Bearer " + environment.OPENAI_API_KEY,
    };

    const openai = new OpenAIApi(configuration);

    for (let text of this.items) {
      let result: any = [];
      const response = await openai.createChatCompletion({
        messages: [
          {
            role: "system",
            content:
              this.promptText +
              " mentioned in the text below. The sentence should be full. The result should be in bullet points and consist of exact quotes.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        model: "gpt-3.5-turbo-16k",
        stream: false,
        temperature: 0,
      });

      result = response.data.choices[0].message?.content;
      this.texts = [
        ...this.texts,
        [
          ...result
            .toString()
            .split("\n")
            .map((texts: string) => texts.replace(/^-/g, "").trim()),
        ],
      ];
    }

    this.transcriptionProcessing = false;
  }

  preprocessTranscription(text: string) {
    const re = /\b(\w\.\w\.)|([.?!])\s+(?=[A-Za-z])/g;
    const result = text.replace(re, function (m, g1, g2) {
      return g1 ? g1 : g2 + "\r";
    });

    const splitText = result.split("\r");
    let tmpString = "";
    splitText.map((stext) => {
      if ((tmpString + stext + " ").length < 14000) {
        tmpString += stext + " ";
      } else {
        this.items.push(tmpString);
        tmpString = stext + " ";
      }
    });
    if (tmpString.length > 0) {
      this.items.push(tmpString);
    }
  }

  onRemoveFile() {
    this.fileName = "";
    this.text = "";
    this.items = [];
    this.texts = [];
  }
}
