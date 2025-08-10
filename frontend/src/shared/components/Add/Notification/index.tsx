"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { admin_notice } from "@/shared/hooks/api/useNotice";
import { CreateNoticeSuccess } from "@/shared/types/forAPI/NoticeType";
import Image from "next/image";
import FileUplaoad from "/public/fileUpload.svg";

import styles from "./index.module.css";
import {
  AuthError,
  AuthValidateContent,
} from "@/shared/types/forAPI/AuthErrorType";
import { toast } from "react-toastify";

export const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const { mutate } = useMutation<
    CreateNoticeSuccess,
    AuthValidateContent | AuthError,
    { title: string; content: string }
  >({
    mutationFn: async ({ title, content }) => {
      const result = await admin_notice(title, content);

      if (
        typeof result === "object" &&
        result !== null &&
        "id" in result &&
        "title" in result &&
        "content" in result &&
        "created_at" in result
      ) {
        return result as CreateNoticeSuccess;
      }
      throw new Error("Failed to create notice");
    },
    onError: (err: any) => {
      toast.error("공지 생성에 실패하였습니다.");
    },
    onSuccess: () => {
      toast.success("공지가 생성되었습니다!");
      setTimeout(() => {
        window.location.href = "/setting?category=Notification";
      }, 1000);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e: FormEvent) => {
    if (title && content) mutate({ title, content });
    else toast.error("내용을 입력해주세요.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            NAME
          </label>
          <input
            id="name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type the Notification's Name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            DESCRIPTION
          </label>
          <textarea
            id="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type the description of the Notification"
            className={styles.textarea}
          />
        </div>

        <div className={styles.formFooter}>
          <div className={styles.formGroup}>
            <label htmlFor="file" className={styles.fileLabel}>
              FILES
            </label>

            <input
              id="files"
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.hiddenFileInput}
            />

            <label htmlFor="files" className={styles.uploadButton}>
              <Image
                src={FileUplaoad}
                alt="파일 업로드"
                width={20}
                height={20}
              />
              {(!files || files.length === 0) && (
                <span className={styles.uploadText}>Upload files</span>
              )}

              {files && files.length > 0 && (
                <span className={styles.fileCount}>
                  {files.length}개 파일 선택됨
                </span>
              )}
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className={styles.submitButton}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
};
