#!/bin/bash
# ============================================================
# MysterMyself — Phase 0 AWS Cleanup Audit
# Run this on your LOCAL machine with mystermyself-dev profile
# Date: 2026-06-20
# ============================================================

set -euo pipefail

PROFILE="mystermyself-dev"
REGIONS=("us-east-1" "us-east-2")
DIVIDER="================================================================"

echo "$DIVIDER"
echo "  MysterMyself — AWS Cleanup Audit"
echo "  Profile: $PROFILE"
echo "  Regions: ${REGIONS[*]}"
echo "  Date: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo "$DIVIDER"
echo ""

# -----------------------------------------------------------------
# 1. VERIFY AWS IDENTITY
# -----------------------------------------------------------------
echo "▶ [1/5] AWS Identity Verification"
echo "-----------------------------------------------------------------"
IDENTITY=$(aws sts get-caller-identity --profile "$PROFILE" --output json 2>&1)
if [ $? -eq 0 ]; then
    echo "✅ PASS — Profile '$PROFILE' authenticated"
    echo "$IDENTITY" | python3 -m json.tool 2>/dev/null || echo "$IDENTITY"
    ACCOUNT_ID=$(echo "$IDENTITY" | python3 -c "import sys,json; print(json.load(sys.stdin)['Account'])" 2>/dev/null)
    echo "   Account ID: $ACCOUNT_ID"
else
    echo "❌ FAIL — Cannot authenticate with profile '$PROFILE'"
    echo "$IDENTITY"
    echo ""
    echo "Fix: Run 'aws configure --profile $PROFILE' or check ~/.aws/credentials"
    exit 1
fi
echo ""

# -----------------------------------------------------------------
# 2. EC2 INSTANCES (running or stopped)
# -----------------------------------------------------------------
echo "▶ [2/5] EC2 Instances (running or stopped)"
echo "-----------------------------------------------------------------"
EC2_FOUND=0
for REGION in "${REGIONS[@]}"; do
    INSTANCES=$(aws ec2 describe-instances \
        --profile "$PROFILE" \
        --region "$REGION" \
        --filters "Name=instance-state-name,Values=running,stopped,stopping,pending" \
        --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,LaunchTime,Tags[?Key==`Name`].Value|[0]]' \
        --output text 2>&1)

    if [ -z "$INSTANCES" ] || [ "$INSTANCES" = "None" ]; then
        echo "  ✅ $REGION: No EC2 instances found"
    else
        echo "  ⚠️  $REGION: EC2 instances detected!"
        echo "     ID                  | Type        | State   | Launched            | Name"
        echo "     --------------------|-------------|---------|---------------------|-----"
        echo "$INSTANCES" | while IFS=$'\t' read -r id type state launch name; do
            printf "     %-19s | %-11s | %-7s | %-19s | %s\n" "$id" "$type" "$state" "$launch" "${name:-<no-name>}"
        done
        EC2_FOUND=1
    fi
done
if [ $EC2_FOUND -eq 0 ]; then
    echo "  ✅ CLEAN — No EC2 instances in any region"
fi
echo ""

# -----------------------------------------------------------------
# 3. RDS DATABASES
# -----------------------------------------------------------------
echo "▶ [3/5] RDS Databases"
echo "-----------------------------------------------------------------"
RDS_FOUND=0
for REGION in "${REGIONS[@]}"; do
    DBS=$(aws rds describe-db-instances \
        --profile "$PROFILE" \
        --region "$REGION" \
        --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceClass,Engine,DBInstanceStatus,AllocatedStorage]' \
        --output text 2>&1)

    if [ -z "$DBS" ] || [ "$DBS" = "None" ]; then
        echo "  ✅ $REGION: No RDS instances found"
    else
        echo "  ⚠️  $REGION: RDS instances detected!"
        echo "     Identifier          | Class       | Engine    | Status    | Storage(GB)"
        echo "     --------------------|-------------|-----------|-----------|------------"
        echo "$DBS" | while IFS=$'\t' read -r id class engine status storage; do
            printf "     %-19s | %-11s | %-9s | %-9s | %s\n" "$id" "$class" "$engine" "$status" "$storage"
        done
        RDS_FOUND=1
    fi
done
if [ $RDS_FOUND -eq 0 ]; then
    echo "  ✅ CLEAN — No RDS instances in any region"
fi
echo ""

# -----------------------------------------------------------------
# 4. LAMBDA FUNCTIONS
# -----------------------------------------------------------------
echo "▶ [4/5] Lambda Functions"
echo "-----------------------------------------------------------------"
LAMBDA_FOUND=0
for REGION in "${REGIONS[@]}"; do
    LAMBDAS=$(aws lambda list-functions \
        --profile "$PROFILE" \
        --region "$REGION" \
        --query 'Functions[*].[FunctionName,Runtime,LastModified,MemorySize,Description]' \
        --output text 2>&1)

    if [ -z "$LAMBDAS" ] || [ "$LAMBDAS" = "None" ]; then
        echo "  ✅ $REGION: No Lambda functions found"
    else
        echo "  ⚠️  $REGION: Lambda functions detected — REVIEW FOR DELETION:"
        echo ""
        echo "     Function Name                    | Runtime     | Last Modified        | Memory | Description"
        echo "     --------------------------------|-------------|----------------------|--------|------------"
        echo "$LAMBDAS" | while IFS=$'\t' read -r name runtime modified memory desc; do
            printf "     %-35s | %-11s | %-20s | %-6s | %s\n" "$name" "${runtime:-N/A}" "$modified" "${memory}MB" "${desc:-<none>}"
        done
        LAMBDA_FOUND=1
        echo ""
        echo "     → To delete a Lambda: aws lambda delete-function --function-name <NAME> --region $REGION --profile $PROFILE"
    fi
done
if [ $LAMBDA_FOUND -eq 0 ]; then
    echo "  ✅ CLEAN — No Lambda functions in any region"
fi
echo ""

# -----------------------------------------------------------------
# 5. TERRAFORM VERSION
# -----------------------------------------------------------------
echo "▶ [5/5] Terraform Installation"
echo "-----------------------------------------------------------------"
if command -v terraform &> /dev/null; then
    TF_VERSION=$(terraform version 2>&1 | head -1)
    echo "  ✅ PASS — $TF_VERSION"
else
    echo "  ❌ FAIL — Terraform not found in PATH"
    echo "     Install: https://developer.hashicorp.com/terraform/install"
    echo "     Recommended: >= 1.5.0"
fi
echo ""

# -----------------------------------------------------------------
# BONUS: Check for stray S3 buckets and SNS topics
# -----------------------------------------------------------------
echo "▶ [BONUS] Other Resources to Watch"
echo "-----------------------------------------------------------------"

echo "  S3 Buckets:"
BUCKETS=$(aws s3api list-buckets --profile "$PROFILE" --query 'Buckets[*].Name' --output text 2>&1)
if [ -z "$BUCKETS" ] || [ "$BUCKETS" = "None" ]; then
    echo "    ✅ No S3 buckets"
else
    echo "    Found:"
    echo "$BUCKETS" | tr '\t' '\n' | sed 's/^/      - /'
fi

echo ""
echo "  SQS Queues (us-east-1):"
QUEUES=$(aws sqs list-queues --profile "$PROFILE" --region us-east-1 --output text 2>&1)
if [ -z "$QUEUES" ] || [ "$QUEUES" = "None" ]; then
    echo "    ✅ No SQS queues"
else
    echo "    Found:"
    echo "$QUEUES" | tr '\t' '\n' | sed 's/^/      - /'
fi

echo ""
echo "  Secrets Manager (us-east-1):"
SECRETS=$(aws secretsmanager list-secrets --profile "$PROFILE" --region us-east-1 --query 'SecretList[*].Name' --output text 2>&1)
if [ -z "$SECRETS" ] || [ "$SECRETS" = "None" ]; then
    echo "    ✅ No secrets"
else
    echo "    Found:"
    echo "$SECRETS" | tr '\t' '\n' | sed 's/^/      - /'
fi

echo ""
echo "$DIVIDER"
echo "  AUDIT COMPLETE"
echo "  If any ⚠️ items above, decide whether to delete before Phase 1."
echo "  Run cleanup commands shown above, then re-run this audit."
echo "$DIVIDER"
