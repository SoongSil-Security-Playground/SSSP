"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { challenge_create } from "@/shared/hooks/api/useChallenge";
import { CreateChallengeForRequest } from "@/shared/types/forAPI/ChallengeType";

import FileUpload from "/public/fileUpload.svg";
import styles from "./index.module.css";

export const AddChall = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateChallengeForRequest>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      flag: "",
      scoring: "dynamic",
      points: "1000",
      decay: "20",
      minimumPoints: "500",
      files: undefined,
      useDocker: false,
      level: 1,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => challenge_create(formData),
    onSuccess: () => {
      alert("생성 성공!");
      window.location.href = "/setting?category=Challenges";
    },
    onError: (err: any) => {
      alert("생성 실패");
    },
  });

  const onSubmit: SubmitHandler<CreateChallengeForRequest> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("flag", data.flag);
    formData.append("scoring", data.scoring);
    formData.append("points", data.points);
    formData.append("level", data.level);
    formData.append("is_dynamic", "true");
    formData.append("decay", data.decay);
    formData.append("minimum_point", data.minimumPoints);

    if (data.files && data.files.length > 0) {
      formData.append("file", data.files[0]);
    }

    mutate(formData);
  };

  const files = watch("files");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formDoubleGroup}>
        <div className={styles.formGroup}>
          <label className={styles.label}>NAME</label>
          <input
            {...register("name", { required: "이름이 필요합니다" })}
            placeholder="Type the Challenge's Name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>CATEGORY</label>
          <input
            {...register("category", { required: "카테고리가 필요합니다" })}
            placeholder="Type the Category"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formSingleGroup}>
        <label className={styles.label}>DESCRIPTION</label>
        <textarea
          {...register("description", { required: "설명이 필요합니다" })}
          placeholder="Type the description of the challenge"
          className={styles.textarea}
        />
      </div>

      <div className={styles.formSingleGroup}>
        <label className={styles.label}>FLAG</label>
        <input
          {...register("flag", { required: "FLAG를 입력하세요" })}
          placeholder="Type the Flag"
          className={styles.input}
        />
      </div>

      <div className={styles.formDoubleGroup}>
        <div className={styles.formGroup}>
          <label className={styles.label}>POINTS</label>
          <input
            {...register("points", { valueAsNumber: true })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>MINIMUM POINTS</label>
          <input
            {...register("minimumPoints", { valueAsNumber: true })}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formDoubleGroup}>
        {/* Drop down & Select for scoring
        But same design with different card Z*/}
        <div className={styles.formGroup}>
          <label className={styles.label}>SCORING</label>
          <select
            {...register("scoring")}
            className={styles.select}
            defaultValue="dynamic"
          >
            <option value="" disabled>Select Scoring Method
            </option>
            <option value="dynamic">Dynamic</option>
            <option value="static">Static</option>
          </select>

        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>DECAY</label>
          <input
            {...register("decay", { valueAsNumber: true })}
            className={styles.input}
          />
        </div>
        </div>
        <div className={styles.formDoubleGroup}>
        <div className={styles.formGroup}>
          <label className={styles.label}>LEVEL</label>
          <select
            {...register("level")}
            className={styles.select}
            defaultValue="level-1"
          >
            <option value="" disabled>Select Level
            </option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
            </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>USE Docker?</label>
          <select
            {...register("useDocker")}
            className={styles.select}
            defaultValue="false"
          >
            <option value="" disabled>Select Scoring Method
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

        </div>
      </div>
      <div className={styles.formFooter}>
        <div className={styles.formGroup} style={{ position: "relative" }}>
          <label className={styles.fileLabel} htmlFor="files">
            FILES
          </label>
          <input
            {...register("files")}
            id="files"
            type="file"
            accept=".zip"
            multiple
            className={styles.hiddenFileInput}
          />
          <label htmlFor="files" className={styles.uploadButton}>
            <Image src={FileUpload} alt="파일 업로드" width={20} height={20} />
            {!files || files.length === 0 ? (
              <span className={styles.uploadText}>upload files</span>
            ) : (
              <span className={styles.fileCount}>
                {files.length}개 파일 선택됨
              </span>
            )}
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          SUBMIT
        </button>
      </div>
    </form>
  );
};
