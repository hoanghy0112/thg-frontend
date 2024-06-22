import aws from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { v4 as uuidv4 } from "uuid";

aws.config.update({
	accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
	region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new aws.S3();

export async function uploadFileToS3(file: File) {
	const id = uuidv4();
	const ext = file.name.split(".").at(1);
	const name = `${id}.${ext}`;

	const s3ObjectRequest: PutObjectRequest = {
		Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
		Body: file,
		Key: name,
	};

	const response = await s3.upload(s3ObjectRequest).promise();
	return response;
}
