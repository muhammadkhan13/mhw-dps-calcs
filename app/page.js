'use client';

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { Monster } from "./monster.js";
import { MonsterList } from "./monster-list.js";
import { Weapon } from "./wp.js";
import { WeaponList } from "./wp-list.js";

export default function Page() {
  return(
    <div>
      <MonsterList/>
    </div>
  );
}
