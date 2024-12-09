"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function LuggagePinGenerator() {
  const [inputDigits, setInputDigits] = useState("");
  const [combinations, setCombinations] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();

  const generateCombinations = (digits: number[]): string[] => {
    const combinations: string[] = [];
    for (let n = 0; n < 10; n++) {
      const combination = digits.map((d) => (d + n) % 10).join("");
      combinations.push(combination);
    }
    return combinations;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = inputDigits.split("").map(Number);
    if (digits.length >= 3) {
      const newCombinations = generateCombinations(digits);
      setCombinations(newCombinations);
    }
  };

  const getMostLikelyCombination = (combinations: string[]): string => {
    return combinations[7] || ""; // 3 steps backward from the initial digits (index 0)
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <Card className="dark:bg-gray-800 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="dark:text-white text-2xl">
                Luggage Pin Generator
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                Generate possible combinations for your luggage pin
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition-colors duration-300"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="digits"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Enter 3 or more digits
                </label>
                <Input
                  type="text"
                  id="digits"
                  value={inputDigits}
                  onChange={(e) =>
                    setInputDigits(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="e.g., 208"
                  className="mt-1 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                  required
                  minLength={3}
                />
              </div>
              <Button type="submit" className="w-full">
                Generate Combinations
              </Button>
            </form>

            {combinations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Possible Combinations:
                </h3>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {combinations.map((combo, index) => (
                    <div
                      key={combo}
                      className={`p-2 text-center rounded transition-colors duration-300 ${
                        combo === getMostLikelyCombination(combinations)
                          ? "bg-green-200 dark:bg-green-700 font-bold"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      {combo}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Alert className="mt-6 dark:bg-gray-700 dark:text-white transition-colors duration-300">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>
                How to identify the initial digits and open your lock
              </AlertTitle>
              <AlertDescription>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Look for a small hole at the bottom of each number on your
                    lock.
                  </li>
                  <li>
                    The numbers with the holes visible are your initial digits.
                  </li>
                  <li>
                    Enter these digits in order from left to right in the input
                    field above.
                  </li>
                  <li>Generate the combinations using the button above.</li>
                  <li>
                    The most likely combination (highlighted in green) is 3
                    steps backward from your initial digits.
                  </li>
                  <li>
                    Try the highlighted combination first, then work your way
                    through the others if needed.
                  </li>
                  <li>
                    Turn all the numbers together one step at a time, trying
                    each combination.
                  </li>
                  <li>
                    Repeat this process (maximum 10 times) until you find the
                    combination that opens the lock.
                  </li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Visual Guide:
              </h3>
              <Image
                src="/luggage-pin-1.jpg"
                alt="Luggage lock with holes indicating initial digits"
                width={600}
                height={400}
                className="rounded-lg shadow-md mb-2"
              />
              <Image
                src="/luggage-pin-2.jpg"
                alt="Luggage lock with holes indicating initial digits"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                The image above shows a typical luggage lock. Notice the small
                holes at the bottom of certain numbers. These indicate your
                initial digits.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
