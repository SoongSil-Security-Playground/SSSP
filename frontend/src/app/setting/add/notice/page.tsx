"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import FileUplaoad from "/public/fileUpload.svg";

import styles from "./page.module.css";

export default function AddNotification() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NOTIFICATION</h1>
      <p className={styles.subtitle}>
        The flag’s format is <span className={styles.code}>SSSP()</span>!
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            NAME
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type the Challenge’s Name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            DESCRIPTION
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type the description of the challenge"
            className={styles.textarea}
          />
        </div>

        <div className={styles.formFooter}>
          <div className={styles.formGroup}>
            <label htmlFor="files" className={styles.label}>
              FILES
            </label>
            <Image
              src={FileUplaoad}
              alt=""
              width={24}
              height={24}
              className={styles.FileUploadImg}
            />
            <input
              id="files"
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
