var QuranAudioPlayer = function(target, surahs) {
  $("#root").load("public/audioPlayer/quran-audio-player.html", function() {
    $(document).foundation();

    var $quranAudio = document.getElementById("quran-audio");
    $quranAudio.src = surahs[0].audio;

    $("#audio-volume").val($quranAudio.volume);

    $("#dropdown-btn").html(
      surahs[0].surahName + "<span><i class='icon-play3'></i></span>"
    );
    $("#dropdown-btn-mobile").html(
      surahs[0].surahName + "<span><i class='icon-play3'></i></span>"
    );

    $("#dropdown-btn").attr({ "data-surah": surahs[0].surahName });
    $("#dropdown-btn-mobile").attr({ "data-surah": surahs[0].surahName });

    surahs.forEach(function(surah) {
      $("#surah-dropdown-menu").append(
        "<div id='" +
          surah.surahName +
          "' data-audio-src='" +
          surah.audio +
          "' > " +
          surah.surahName +
          " </d>"
      );

      $("#" + surah.surahName).on("click", selectSurahFromDropdown);

      $("#surah-dropdown-menu-mobile").append(
        "<div id='" +
          surah.surahName +
          "' data-audio-src='" +
          surah.audio +
          "' > " +
          surah.surahName +
          " </d>"
      );
      $("#" + surah.surahName).on("click", selectSurahFromDropdown);
    });

    function selectSurahFromDropdown(event) {
      selectSurahAudio(event.target.getAttribute("data-audio-src"));

      var $dropdownBtn = window.matchMedia("(min-width:700px)").matches
        ? $("#dropdown-btn")
        : $("#dropdown-btn-mobile");

      $($dropdownBtn).html(
        event.target.innerHTML + "<span><i class='icon-play3'></i></span>"
      );
      $($dropdownBtn).attr({ "data-surah": event.target.innerHTML });
    }

    var audioDuration = $quranAudio.duration;

    var $playerSeeker = document.getElementById("player-seeker");
    var $playerSeeked = document.getElementById("player-seeked");
    var totalAudioTimeWidth =
      $playerSeeker.offsetWidth - $playerSeeked.offsetWidth;

    // Event listeners...

    $("#audio-volume").on("change", function(event) {
      $quranAudio.volume = event.target.value;
    });

    $("#quran-audio").on("ended", function() {
      playNextSurah();
    });

    function updateSeeker(event) {
      $("#player-seeked").css("width", event.offsetX);
    }

    $("#quran-audio").on("timeupdate", function(event) {
      var totalAudioDuration = calculateTotalValue($quranAudio.duration);
      var currentAudioTime = calculateCurrentValue($quranAudio.currentTime);
      document.querySelector(".player-current-time").innerHTML =
        currentAudioTime + "&nbsp;";
      document.querySelector(".player-total-time").innerHTML =
        " / " + totalAudioDuration;

      var width =
        totalAudioTimeWidth * ($quranAudio.currentTime / $quranAudio.duration);

      $("#player-seeked").css("width", width);
    });

    $("#player-seeker").on("click", function(event) {
      updateSeeker(event);
      $quranAudio.currentTime = $quranAudio.duration * clickPercent(event);
    });

    function clickPercent(event) {
      return (event.clientX - getPosition($playerSeeker)) / totalAudioTimeWidth;
    }

    $("#surah-list").on("change", changeSurahList);
    $("#surah-list-mobile").on("change", changeSurahList);

    function changeSurahList(event) {
      selectSurahAudio(event.target.selectedOptions[0].value);
    }

    $("#next-btn").on("click", playNextSurah);
    $("#previous-btn").on("click", playPreviousSurah);

    $("#play-btn").on("click", function(event) {
      if ($quranAudio.paused) {
        displayPauseButton();
        $quranAudio.play();
      } else {
        displayPlayButton();
        $quranAudio.pause();
      }
    });

    function playPreviousSurah(event) {
      var $surahList = window.matchMedia("(min-width:700px)").matches
        ? $("#surah-dropdown-menu")[0]
        : $("#surah-dropdown-menu-mobile")[0];

      var $dropdownBtn = window.matchMedia("(min-width:700px)").matches
        ? $("#dropdown-btn")
        : $("#dropdown-btn-mobile");

      var selectedIndex = getSurahIndex($($dropdownBtn).attr("data-surah"));
      var nextSurah = $surahList.children[selectedIndex - 1];

      if (nextSurah) {
        selectSurahAudio($(nextSurah).attr("data-audio-src"));
        $($dropdownBtn).html(
          nextSurah.innerHTML + "<span><i class='icon-play3'></i></span>"
        );
        $($dropdownBtn).attr({ "data-surah": nextSurah.innerHTML });
      }
    }

    function playNextSurah(event) {
      var $surahList = window.matchMedia("(min-width:700px)").matches
        ? $("#surah-dropdown-menu")[0]
        : $("#surah-dropdown-menu-mobile")[0];

      var $dropdownBtn = window.matchMedia("(min-width:700px)").matches
        ? $("#dropdown-btn")
        : $("#dropdown-btn-mobile");

      var selectedIndex = getSurahIndex($($dropdownBtn).attr("data-surah"));
      var nextSurah = $surahList.children[selectedIndex + 1];

      if (nextSurah) {
        selectSurahAudio($(nextSurah).attr("data-audio-src"));
        $($dropdownBtn).html(
          nextSurah.innerHTML + "<span><i class='icon-play3'></i></span>"
        );
        $($dropdownBtn).attr({ "data-surah": nextSurah.innerHTML });
      } else {
        $quranAudio.pause();
        displayPlayButton();
      }
    }

    function selectSurahAudio(surahAudio) {
      $quranAudio.pause();
      displayPauseButton();
      $quranAudio.src = surahAudio;
      $quranAudio.play();
    }

    function displayPauseButton() {
      $("#play-btn").removeClass("play-btn");
      $("#play-btn").addClass("pause-btn");
    }

    function displayPlayButton() {
      $("#play-btn").addClass("play-btn");
      $("#play-btn").removeClass("pause-btn");
    }

    function getPosition(el) {
      return el.getBoundingClientRect().left;
    }

    function calculateTotalValue(length) {
      if (length > 0) {
        var minutes = Math.floor(length / 60) + "",
          seconds_int = length - minutes * 60,
          seconds_str = seconds_int.toString(),
          seconds = Math.round(seconds_str.substr(0, 2)) + "",
          time =
            (minutes.length === 1 ? "0" + minutes : minutes) +
            ":" +
            (seconds.length === 1 ? "0" + seconds : seconds);

        return time;
      }
      return "00:00";
    }

    function calculateCurrentValue(currentTime) {
      var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60),
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time =
          (current_minute < 10 ? "0" + current_minute : current_minute) +
          ":" +
          (current_seconds < 10 ? "0" + current_seconds : current_seconds);

      return current_time;
    }

    $("#dropdown-btn").on("click", function() {
      if ($("#surah-dropdown-menu").css("display") === "block") {
        $("#surah-dropdown-menu").css("display", "none");
      } else {
        $("#surah-dropdown-menu").css("display", "block");
      }
    });

    $("#dropdown-btn-mobile").on("click", function() {
      if ($("#surah-dropdown-menu-mobile").css("display") === "block") {
        $("#surah-dropdown-menu-mobile").css("display", "none");
      } else {
        $("#surah-dropdown-menu-mobile").css("display", "block");
      }
    });

    window.onclick = function(event) {
      if (!event.target.matches("#dropdown-btn")) {
        if ($("#surah-dropdown-menu").css("display") === "block") {
          $("#surah-dropdown-menu").css("display", "none");
        }
      }

      if (!event.target.matches("#dropdown-btn-mobile")) {
        if ($("#surah-dropdown-menu-mobile").css("display") === "block") {
          $("#surah-dropdown-menu-mobile").css("display", "none");
        }
      }
    };

    $("#minimize-mobile").on("click", function(event) {
      var state = event.target.getAttribute("data-state");
      if (state === "minimize") {
        $(event.target).attr({ "data-state": "maximize" });
        event.target.innerHTML = "+";
        $(".surah-mobile").css("display", "none");
        $(".player-seeker").css("display", "none");
        $(".player-timer").css("display", "none");
        $("#player-controls").removeClass("player-controls");
        $("#player-controls").addClass("player-controls-minimize");
        //   $(".audio-player").css("height", "49px");
        $(".audio-player").animate({ height: "49px" });
      } else {
        $(event.target).attr({ "data-state": "minimize" });
        event.target.innerHTML = "-";
        $(".surah-mobile").css("display", "block");
        $(".player-seeker").css("display", "block");
        $(".player-timer").css("display", "block");
        $("#player-controls").removeClass("player-controls-minimize");
        $("#player-controls").addClass("player-controls");
        //   $(".audio-player").css("height", "101px");
        $(".audio-player").animate({ height: "101px" });
      }
    });

    function getSurahIndex(surahName) {
      var surahIndex = -1;
      for (var i = 0; i < surahs.length; i++) {
        if (surahs[i].surahName.trim() === surahName.trim()) {
          surahIndex = i;
          break;
        }
      }
      return surahIndex;
    }
  });
};
