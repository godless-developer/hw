"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SelectDemo } from "./components/forms";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [showScare, setShowScare] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 💾 check if user already viewed the scary sequence
  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenHalloween");
    if (hasSeen) {
      // skip straight to countdown
      setShowCount(true);
    }
  }, []);

  // ⏰ countdown logic
  useEffect(() => {
    const targetDate = new Date("2025-10-31T18:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 👻 scare trigger
  const triggerScare = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setShowScare(true);

    setTimeout(() => {
      setShowScare(false);
      setShowVideo(true);
    }, 4000);
  };

  // 🎥 when video ends -> show countdown
  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowCount(true);
    localStorage.setItem("hasSeenHalloween", "true");
  };

  const label = "7. Ажлын хамт олон дунд уур амьсгал хэр байна вэ?";
  const options = {
    option1: "Маш найрсаг",
    option2: "Найрсаг",
    option3: "Дунд",
    option4: "Хүйтэн",
    option5: "Сөрөг",
  };

  // 🧠 if user already saw — skip everything
  if (showCount) {
    return (
      <main className="fixed inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-[#0a0000] to-[#1a0000] overflow-hidden text-white">
        {/* Countdown title */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#ff3b3b] tracking-[0.2em] drop-shadow-[0_0_25px_#ff0000cc] animate-pulse select-none">
          𓉸ྀི HALLOWEEN COUNTDOWN 𓉸ྀི
        </h2>

        <div className="mt-4 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#ff0000] to-transparent animate-pulse" />

        {/* Countdown digits */}
        <div className="mt-8 text-5xl md:text-6xl font-mono flex gap-8 justify-center text-[#ff4b4b] drop-shadow-[0_0_20px_#ff0000bb] select-none">
          <span className="animate-[flicker_1.5s_infinite]">
            {String(timeLeft.days).padStart(2, "0")}
            <span className="text-[#ff9b9b] text-2xl ml-1">D</span>
          </span>
          <span className="animate-[flicker_2s_infinite]">
            {String(timeLeft.hours).padStart(2, "0")}
            <span className="text-[#ff9b9b] text-2xl ml-1">H</span>
          </span>
          <span className="animate-[flicker_2.5s_infinite]">
            {String(timeLeft.minutes).padStart(2, "0")}
            <span className="text-[#ff9b9b] text-2xl ml-1">M</span>
          </span>
          <span className="animate-[flicker_3s_infinite]">
            {String(timeLeft.seconds).padStart(2, "0")}
            <span className="text-[#ff9b9b] text-2xl ml-1">S</span>
          </span>
        </div>

        <p className="mt-8 text-lg text-[#ffb3b3] tracking-widest font-semibold drop-shadow-[0_0_10px_#ff4d4d80] select-none">
          UNTIL OCTOBER 31, 2025 • 18:00
        </p>

        {/* spooky candles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[10%] top-[20%] text-7xl opacity-20 animate-pulse">
            🕯️
          </div>
          <div className="absolute right-[15%] bottom-[25%] text-8xl opacity-30 animate-pulse">
            🕯️
          </div>
          <div className="absolute left-[30%] bottom-[10%] text-8xl opacity-25 animate-pulse">
            🕯️
          </div>
        </div>
      </main>
    );
  }

  // 🧾 form + scare + video sequence (first time only)
  return (
    <main className="relative min-h-screen flex items-center justify-center md:p-16 p-6 overflow-hidden text-white">
      <audio ref={audioRef} src="/scary.mp3" preload="auto" />

      {/* 👻 scare image */}
      {showScare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-white text-6xl font-bold tracking-widest">
          <Image
            src="/scary1.avif"
            alt="scare"
            fill
            priority
            className="w-full h-full object-fill"
          />
        </div>
      )}

      {/* 🎬 video */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <video
            src="/Halloween.mp4"
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover brightness-[1.1] contrast-[1.05] saturate-[1.2]"
            style={{
              filter: "drop-shadow(0 0 10px rgba(255,0,0,0.15))",
              transform: "translateZ(0)",
            }}
            onEnded={handleVideoEnd}
          />
        </div>
      )}

      {/* 💀 form (before scare) */}
      <div className="bg-white rounded-2xl w-full max-w-2xl py-6 space-y-6 shadow-2xl z-10 border-y-12 border-blue-900 text-black">
        <div className="flex items-center justify-between md:px-8 px-12">
          <Image
            src={"/mcs-holding.png"}
            alt="logo"
            width={2000}
            height={2000}
            className="h-[32px] w-[230px]"
            priority
          />
          <Image
            src={"/techpackLogoDark.png"}
            alt="logo"
            width={2000}
            height={2000}
            className="hidden sm:block h-[70px] w-[160px]"
            priority
          />
        </div>

        <div className="flex flex-col gap-4 px-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Сэтгэл ханамж болон оффис орчны судалгаа
          </h1>
          <p className="text-center text-gray-500 text-sm">
            Та энэхүү судалгааг үнэн зөв, шударгаар бөглөнө үү. Хариултууд тань
            бидэнд байгууллагын соёлыг сайжруулахад тусална.
          </p>
        </div>

        <form className="space-y-6 text-black md:px-10 px-4 text-[14px]">
          <SelectDemo
            label="1. Ажлын хамт олон дунд уур амьсгал хэр байна вэ?"
            options={{
              option1: "Маш найрсаг",
              option2: "Найрсаг",
              option3: "Дунд",
              option4: "Хүйтэн",
              option5: "Сөрөг",
            }}
          />

          <SelectDemo
            label="2. Та ажлын цагийн уян хатан байдлыг хэрхэн үнэлэх вэ?"
            options={{
              option1: "Маш сайн",
              option2: "Дунд зэрэг",
              option3: "Уян хатан биш",
            }}
          />

          <SelectDemo
            label="3. Та ажлын ачааллаа хэрхэн үнэлэх вэ?"
            options={{
              option1: "Хэт их",
              option2: "Зохистой",
              option3: "Хэт бага",
            }}
          />

          <SelectDemo
            label="4. Таны удирдлагын зүгээс үзүүлж буй дэмжлэгийг хэрхэн үнэлэх вэ?"
            options={{
              option1: "Маш сайн",
              option2: "Сайн",
              option3: "Дунд",
              option4: "Муу",
              option5: "Маш муу",
            }}
          />

          <SelectDemo
            label="5. Ажлын орчин (оффис, тоног төхөөрөмж, агаар, гэрэлтүүлэг гэх мэт) танд хэр таатай вэ?"
            options={{
              option1: "Маш таатай",
              option2: "Таатай",
              option3: "Дунд зэрэг",
              option4: "Тааламжгүй",
              option5: "Маш тааламжгүй",
            }}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-3">
              6. Та ажлын байр болон оффис орчиндоо нэмэхийг хүсэж буй зүйлээ
              бичнэ үү?
            </label>
            <input
              type="text"
              placeholder="Массажны сандал..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-4">
            {label && (
              <label className="text-gray-800 font-medium text-[15px]">
                {label}
              </label>
            )}
            <Select>
              <SelectTrigger
                onFocus={triggerScare}
                className="w-full px-4 py-2.5 bg-white/90 rounded-xl text-gray-800 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md border focus:outline-none cursor-pointer"
              >
                <SelectValue placeholder="Сонгох..." />
              </SelectTrigger>

              <SelectContent className="bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 rounded-xl transition-all duration-200">
                <SelectGroup className="text-gray-700">
                  {Object.values(options).map((option, idx) => (
                    <SelectItem
                      key={idx}
                      value={option}
                      className="hover:bg-blue-500 focus:bg-blue-300 cursor-pointer rounded-[11px] transition-all duration-150"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <SelectDemo
            label="8. Удирдлагуудын зүгээс санал, санаачилгыг хэр хүлээн авч байна вэ?"
            options={{
              option1: "Идэвхтэй дэмждэг",
              option2: "Сонсдог ч хэрэгжүүлэх нь ховор",
              option3: "Сонсдоггүй",
            }}
          />

          <SelectDemo
            label="9. Та байгууллагад урт хугацаанд ажиллах сонирхолтой юу?"
            options={{
              option1: "Тийм, маш сонирхолтой",
              option2: "Тийм",
              option3: "Мэдэхгүй",
              option4: "Үгүй",
              option5: "Үгүй, огт сонирхолгүй",
            }}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-3">
              10. Нэмэлт санал, сэтгэгдэл (чөлөөтэй бичнэ үү)
            </label>
            <textarea
              placeholder="Санал, сэтгэгдлээ энд бичнэ үү..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition duration-200"
            >
              Илгээх
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
