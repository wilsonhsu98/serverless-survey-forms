# Instruction for Issue #1589.

The issue has been reported to [issue#1589](https://github.com/serverless/serverless/issues/1589).

After executing ```sls resources deploy```, **Forward Headers** in CloudFront is not set correctly.

Please follow steps below to work around the issue.

* Login **AWS Console**.
* Open **CloudFront** | **Distributions**.
* Click on the distribution created by serverless-survey-forms.
* Switch to tab **Behaviors**, and edit **api/\***.
* Change **Forward Headers** to **Whitelist**.
* Add the following headers in **Whitelist Headers**
    * **Authorization**

![](https://media.amazonwebservices.com/blog/2014/cloudfront_console_whitelist_headers_2.png)

* Click on **Yes, Edit**

## References

* [Deliver Custom Content With CloudFront](https://aws.amazon.com/tw/blogs/aws/enhanced-cloudfront-customization/)
